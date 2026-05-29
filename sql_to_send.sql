-- 1. Asegurar que las políticas de seguridad están bien (por si falló antes)
drop policy if exists "tournament_anon_insert" on public.tournament_results;
grant insert on table public.tournament_results to anon;
alter table public.tournament_results enable row level security;
create policy "tournament_anon_insert" on public.tournament_results for insert to anon with check (true);

-- 2. Cambiar la métrica de 'Total de duelos' a 'Total de Torneos Completados'
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
      SELECT json_build_object('winner_id', winner_id, 'wins', count)
      FROM (
        SELECT winner_id, count(*) as count
        FROM tournament_results
        WHERE mode = 'classic'
        GROUP BY winner_id
        ORDER BY count DESC
        LIMIT 1
      ) c
    ),
    'top_setlist', (
      SELECT COALESCE(json_agg(t), '[]'::json) FROM (
        SELECT song_id, count(*) as count
        FROM tournament_results, jsonb_array_elements_text(top_songs) as song_id
        WHERE mode = 'survivor'
        GROUP BY song_id
        ORDER BY count DESC
        LIMIT 5
      ) t
    ),
    'closest_duel', (
      SELECT json_build_object(
        'song_a_id', song_a_id,
        'song_b_id', song_b_id,
        'votes_a', sum(case when winner_id = song_a_id then 1 else 0 end),
        'votes_b', sum(case when winner_id = song_b_id then 1 else 0 end)
      )
      FROM matchups
      GROUP BY least(song_a_id, song_b_id), greatest(song_a_id, song_b_id), song_a_id, song_b_id
      HAVING sum(case when winner_id = song_a_id then 1 else 0 end) > 0 
         AND sum(case when winner_id = song_b_id then 1 else 0 end) > 0
      ORDER BY abs(
        sum(case when winner_id = song_a_id then 1 else 0 end) - 
        sum(case when winner_id = song_b_id then 1 else 0 end)
      ) ASC
      LIMIT 1
    ),
    'total_matchups', (
      SELECT count(*) FROM tournament_results
    )
  ) INTO result;
  
  RETURN result;
END;
$$;
