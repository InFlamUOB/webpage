-- ==============================================================================
-- FANDOM OBSERVATORY: ADVANCED ANALYTICS SCHEMA
-- ==============================================================================

-- 1. DROP OLD TABLES (Clean Slate)
-- ==============================================================================
DROP FUNCTION IF EXISTS public.get_global_stats();
DROP TABLE IF EXISTS public.matchups CASCADE;
DROP TABLE IF EXISTS public.tournament_results CASCADE;

-- 2. CREATE NEW TABLES
-- ==============================================================================

-- App Sessions
CREATE TABLE public.app_sessions (
    id UUID PRIMARY KEY,
    anonymous_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    language TEXT,
    country TEXT,
    device_type TEXT,
    referrer TEXT,
    landing_path TEXT
);

-- Game Events
CREATE TABLE public.game_events (
    id UUID PRIMARY KEY,
    anonymous_id TEXT NOT NULL,
    session_id UUID REFERENCES public.app_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    event_name TEXT NOT NULL,
    mode TEXT,
    metadata JSONB
);

-- Duel Votes
CREATE TABLE public.duel_votes (
    id UUID PRIMARY KEY,
    anonymous_id TEXT NOT NULL,
    session_id UUID REFERENCES public.app_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    mode TEXT NOT NULL,
    tournament_id UUID,
    round_number INTEGER,
    song_a_id TEXT NOT NULL,
    song_b_id TEXT NOT NULL,
    winner_song_id TEXT NOT NULL,
    loser_song_id TEXT NOT NULL,
    winner_position TEXT,
    response_time_ms INTEGER
);

-- Tournament Results
CREATE TABLE public.tournament_results (
    id UUID PRIMARY KEY,
    anonymous_id TEXT NOT NULL,
    session_id UUID REFERENCES public.app_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    mode TEXT NOT NULL,
    tournament_size INTEGER,
    selected_eras TEXT[],
    winner_song_id TEXT NOT NULL,
    runner_up_song_id TEXT,
    top_songs JSONB,
    total_duels INTEGER,
    duration_ms INTEGER,
    shared BOOLEAN DEFAULT FALSE
);

-- Trivia Answers
CREATE TABLE public.trivia_answers (
    id UUID PRIMARY KEY,
    anonymous_id TEXT NOT NULL,
    session_id UUID REFERENCES public.app_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    quiz_id UUID NOT NULL,
    question_number INTEGER NOT NULL,
    song_id TEXT NOT NULL,
    chosen_song_id TEXT,
    correct BOOLEAN NOT NULL,
    response_time_ms INTEGER,
    hint_used BOOLEAN DEFAULT FALSE
);

-- Trivia Results
CREATE TABLE public.trivia_results (
    id UUID PRIMARY KEY,
    anonymous_id TEXT NOT NULL,
    session_id UUID REFERENCES public.app_sessions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    quiz_id UUID NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    score INTEGER NOT NULL,
    avg_response_time_ms INTEGER,
    duration_ms INTEGER,
    shared BOOLEAN DEFAULT FALSE
);


-- 3. ENABLE ROW LEVEL SECURITY (RLS) & GRANTS
-- ==============================================================================

-- Enable RLS
ALTER TABLE public.app_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.duel_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trivia_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trivia_results ENABLE ROW LEVEL SECURITY;

-- Grant INSERT access to anon
GRANT INSERT ON TABLE public.app_sessions TO anon;
GRANT INSERT ON TABLE public.game_events TO anon;
GRANT INSERT ON TABLE public.duel_votes TO anon;
GRANT INSERT ON TABLE public.tournament_results TO anon;
GRANT INSERT ON TABLE public.trivia_answers TO anon;
GRANT INSERT ON TABLE public.trivia_results TO anon;

-- Create Insert Policies (Allow anonymous inserts)
CREATE POLICY "anon_insert_sessions" ON public.app_sessions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_events" ON public.game_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_duels" ON public.duel_votes FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_tournaments" ON public.tournament_results FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_trivia_ans" ON public.trivia_answers FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_insert_trivia_res" ON public.trivia_results FOR INSERT TO anon WITH CHECK (true);

-- NO SELECT POLICIES CREATED FOR RAW TABLES (Blocks public read access to raw data)


-- 4. CREATE AGGREGATED VIEWS FOR PUBLIC READS
-- ==============================================================================

-- A. global_song_rankings
CREATE OR REPLACE VIEW public.global_song_rankings AS
SELECT 
    song_id,
    COUNT(*) AS total_duels,
    SUM(CASE WHEN winner_song_id = song_id THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN loser_song_id = song_id THEN 1 ELSE 0 END) AS losses,
    CASE WHEN COUNT(*) > 0 THEN 
        (SUM(CASE WHEN winner_song_id = song_id THEN 1 ELSE 0 END)::FLOAT / COUNT(*)) * 100 
    ELSE 0 END AS win_rate
FROM (
    SELECT winner_song_id AS song_id, winner_song_id, loser_song_id FROM public.duel_votes
    UNION ALL
    SELECT loser_song_id AS song_id, winner_song_id, loser_song_id FROM public.duel_votes
) AS all_duels
GROUP BY song_id;

-- Grant Select on view
GRANT SELECT ON TABLE public.global_song_rankings TO anon;


-- B. controversial_duels
CREATE OR REPLACE VIEW public.controversial_duels AS
SELECT 
    LEAST(song_a_id, song_b_id) AS song_a,
    GREATEST(song_a_id, song_b_id) AS song_b,
    COUNT(*) AS total_votes,
    SUM(CASE WHEN winner_song_id = LEAST(song_a_id, song_b_id) THEN 1 ELSE 0 END) AS song_a_wins,
    SUM(CASE WHEN winner_song_id = GREATEST(song_a_id, song_b_id) THEN 1 ELSE 0 END) AS song_b_wins,
    ABS(
        SUM(CASE WHEN winner_song_id = LEAST(song_a_id, song_b_id) THEN 1 ELSE 0 END) - 
        SUM(CASE WHEN winner_song_id = GREATEST(song_a_id, song_b_id) THEN 1 ELSE 0 END)
    ) AS vote_difference
FROM public.duel_votes
GROUP BY LEAST(song_a_id, song_b_id), GREATEST(song_a_id, song_b_id)
ORDER BY vote_difference ASC, total_votes DESC;

GRANT SELECT ON TABLE public.controversial_duels TO anon;


-- 5. RECREATE GLOBAL STATS RPC FOR FRONTEND
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.get_global_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result json;
BEGIN
  SELECT json_build_object(
    'global_champion', (
      SELECT json_build_object('winner_id', winner_song_id, 'wins', count)
      FROM (
        SELECT winner_song_id, count(*) as count
        FROM public.tournament_results
        WHERE mode = 'classic'
        GROUP BY winner_song_id
        ORDER BY count DESC
        LIMIT 1
      ) c
    ),
    'top_setlist', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT song_id, count(*) as count
        FROM public.tournament_results, jsonb_array_elements_text(top_songs) as song_id
        WHERE mode = 'survivor'
        GROUP BY song_id
        ORDER BY count DESC
        LIMIT 5
      ) t
    ),
    'closest_duel', (
      SELECT json_build_object(
        'song_a_id', song_a,
        'song_b_id', song_b,
        'votes_a', song_a_wins,
        'votes_b', song_b_wins
      )
      FROM public.controversial_duels
      LIMIT 1
    ),
    'total_matchups', (
      SELECT count(*) FROM public.tournament_results
    )
  ) INTO result;
  
  RETURN result;
END;
$$;
