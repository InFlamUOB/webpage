grant select on table public.tournament_results to anon;
drop policy if exists "tournament_anon_select" on public.tournament_results;
create policy "tournament_anon_select" on public.tournament_results for select to anon using (true);
