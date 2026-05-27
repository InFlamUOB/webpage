-- ==============================================================================
-- FANDOM OBSERVATORY: ANALYTICS V2 SCHEMA UPDATE
-- ==============================================================================

-- 1. UPDATE VIEWS FOR SECURITY (Fixing Supabase Advisor Warnings)
-- ==============================================================================

-- A. global_song_rankings (Filtered to Classic Mode only for Hero Stat)
CREATE OR REPLACE VIEW public.global_song_rankings WITH (security_invoker = true) AS
SELECT 
    song_id,
    COUNT(*) AS total_duels,
    SUM(CASE WHEN winner_song_id = song_id THEN 1 ELSE 0 END) AS wins,
    SUM(CASE WHEN loser_song_id = song_id THEN 1 ELSE 0 END) AS losses,
    CASE WHEN COUNT(*) > 0 THEN 
        (SUM(CASE WHEN winner_song_id = song_id THEN 1 ELSE 0 END)::FLOAT / COUNT(*)) * 100 
    ELSE 0 END AS win_rate
FROM (
    SELECT winner_song_id AS song_id, winner_song_id, loser_song_id FROM public.duel_votes WHERE mode = 'classic'
    UNION ALL
    SELECT loser_song_id AS song_id, winner_song_id, loser_song_id FROM public.duel_votes WHERE mode = 'classic'
) AS all_duels
GROUP BY song_id;

-- B. controversial_duels (Filtered to Classic Mode only)
CREATE OR REPLACE VIEW public.controversial_duels WITH (security_invoker = true) AS
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
WHERE mode = 'classic'
GROUP BY LEAST(song_a_id, song_b_id), GREATEST(song_a_id, song_b_id)
ORDER BY vote_difference ASC, total_votes DESC;


-- 2. UPDATE RPC TO RETURN RICH JSON
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
    
    -- HERO STAT: Classic Mode Champion (win rate + tournament wins)
    'global_champion', (
      SELECT json_build_object(
        'song_id', tr.winner_song_id,
        'tournament_wins', tr.count,
        'win_rate', COALESCE(gsr.win_rate, 0)
      )
      FROM (
        SELECT winner_song_id, count(*) as count
        FROM public.tournament_results
        WHERE mode = 'classic'
        GROUP BY winner_song_id
        ORDER BY count DESC
        LIMIT 1
      ) tr
      LEFT JOIN public.global_song_rankings gsr ON tr.winner_song_id = gsr.song_id
    ),
    
    -- COPA TOP 5: Most successful songs in Copa (by tournament wins + duel win rate)
    'copa_top5', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT 
          gsr.song_id,
          gsr.wins,
          gsr.total_duels,
          ROUND(gsr.win_rate::numeric, 1) AS win_rate,
          COALESCE(tr.tournament_wins, 0) AS tournament_wins
        FROM public.global_song_rankings gsr
        LEFT JOIN (
          SELECT winner_song_id, count(*) as tournament_wins
          FROM public.tournament_results
          WHERE mode = 'classic'
          GROUP BY winner_song_id
        ) tr ON gsr.song_id = tr.winner_song_id
        WHERE gsr.total_duels > 0
        ORDER BY gsr.wins DESC, gsr.win_rate DESC
        LIMIT 5
      ) t
    ),
    
    -- TOTAL CLASSIC TOURNAMENTS (for "X de Y copas" display)
    'total_classic', (
      SELECT count(*) FROM public.tournament_results WHERE mode = 'classic'
    ),
    
    -- TOUR MODE: Top 5 Setlist (ranked by how many times each song WON a full Tour)
    'top_setlist', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT winner_song_id AS song_id, count(*) AS count
        FROM public.tournament_results
        WHERE mode = 'survivor'
        GROUP BY winner_song_id
        ORDER BY count DESC
        LIMIT 5
      ) t
    ),
    
    -- TOUR MODE: Most Anticipated (song with most Tour wins — same source as top_setlist #1)
    'tour_champion', (
      SELECT json_build_object('song_id', winner_song_id, 'wins', count)
      FROM (
        SELECT winner_song_id, count(*) as count
        FROM public.tournament_results
        WHERE mode = 'survivor'
        GROUP BY winner_song_id
        ORDER BY count DESC
        LIMIT 1
      ) t
    ),

    -- QUIZ INSIGHTS: Hardest Songs (Most Failed)
    'quiz_hardest', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT 
          song_id, 
          SUM(CASE WHEN correct = false THEN 1 ELSE 0 END) as fails,
          COUNT(*) as total_attempts
        FROM public.trivia_answers
        GROUP BY song_id
        HAVING SUM(CASE WHEN correct = false THEN 1 ELSE 0 END) > 0
        ORDER BY fails DESC, total_attempts DESC
        LIMIT 3
      ) t
    ),

    -- QUIZ INSIGHTS: Fastest Recognised (Lowest Avg Response Time for Correct Answers)
    'quiz_fastest', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT song_id, avg(response_time_ms) as avg_time
        FROM public.trivia_answers
        WHERE correct = true
        GROUP BY song_id
        ORDER BY avg_time ASC
        LIMIT 3
      ) t
    ),

    -- COPA: Hardest Duels (the longest someone took to decide in a single play)
    'hardest_duel', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT
          LEAST(song_a_id, song_b_id) AS song_a,
          GREATEST(song_a_id, song_b_id) AS song_b,
          ROUND(MAX(response_time_ms)::numeric / 1000, 1) AS avg_seconds,
          COUNT(*) AS total_votes
        FROM public.duel_votes
        WHERE mode = 'classic'
          AND response_time_ms IS NOT NULL
          AND response_time_ms BETWEEN 500 AND 90000  -- ignore instant clicks and tabbed-away sessions
        GROUP BY LEAST(song_a_id, song_b_id), GREATEST(song_a_id, song_b_id)
        ORDER BY avg_seconds DESC
        LIMIT 3
      ) t
    ),
    
    -- COMMUNITY STATS
    'community_stats', (
      SELECT json_build_object(
        'total_classic', (SELECT count(*) FROM public.tournament_results WHERE mode = 'classic'),
        'total_survivor', (SELECT count(*) FROM public.tournament_results WHERE mode = 'survivor'),
        'total_duels', (SELECT count(*) FROM public.duel_votes),
        'total_quizzes', (SELECT count(*) FROM public.trivia_results)
      )
    )
  ) INTO result;
  
  -- If closest_duel was null due to threshold, fetch absolute closest regardless of threshold
  IF (result->>'closest_duel') IS NULL THEN
    result := jsonb_set(
      result::jsonb, 
      '{closest_duel}', 
      COALESCE((
        SELECT json_build_object(
          'song_a_id', song_a,
          'song_b_id', song_b,
          'votes_a', song_a_wins,
          'votes_b', song_b_wins,
          'total', total_votes
        )
        FROM public.controversial_duels
        ORDER BY vote_difference ASC, total_votes DESC
        LIMIT 1
      )::jsonb, 'null'::jsonb)
    )::json;
  END IF;
  
  RETURN result;
END;
$$;

-- 3. GRANT PERMISSIONS SO anon CAN INSERT AND SELECT duel_votes
-- ==============================================================================
GRANT INSERT, SELECT ON public.duel_votes TO anon;
