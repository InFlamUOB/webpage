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
    SELECT winner_song_id AS song_id, winner_song_id, loser_song_id FROM public.duel_votes
    UNION ALL
    SELECT loser_song_id AS song_id, winner_song_id, loser_song_id FROM public.duel_votes
) AS all_duels
GROUP BY song_id;

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
GROUP BY LEAST(song_a_id, song_b_id), GREATEST(song_a_id, song_b_id)
ORDER BY vote_difference ASC, total_votes DESC;
