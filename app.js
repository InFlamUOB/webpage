// =========================================
// SUPABASE (ANALYTICS & DATA COLLECTION)
// Now managed by analytics.js
// =========================================
let gameMode = 'classic'; // 'classic', 'survivor', or 'quiz'

// =========================================
// CANCIÓN SORPRESA — TOUR HEATMAP DATA
// =========================================
const TOUR_EXCLUSIVE_DATA = {
  pastShows: [
    { slug:"dr1",  flag:"🇩🇴", label:"Sto. Domingo 1", date:"21 Nov", exclusive:"25-8",              guest:"Romeo Santos" },
    { slug:"dr2",  flag:"🇩🇴", label:"Sto. Domingo 2", date:"22 Nov", exclusive:"despues-playa",     guest:"Romeo Santos" },
    { slug:"cr1",  flag:"🇨🇷", label:"San José 1",     date:"4 Dic",  exclusive:"caro",              guest:null },
    { slug:"cr2",  flag:"🇨🇷", label:"San José 2",     date:"5 Dic",  exclusive:"te-deseo",          guest:"Jhayco" },
    { slug:"mx1",  flag:"🇲🇽", label:"México N1",      date:"10 Dic", exclusive:"chambea",           guest:null },
    { slug:"mx2",  flag:"🇲🇽", label:"México N2",      date:"11 Dic", exclusive:"perro-negro",       guest:"Feid" },
    { slug:"mx3",  flag:"🇲🇽", label:"México N3",      date:"12 Dic", exclusive:"amorfoda",          guest:null },
    { slug:"mx4",  flag:"🇲🇽", label:"México N4",      date:"15 Dic", exclusive:"where-she-goes",    guest:"Grupo Frontera" },
    { slug:"mx5",  flag:"🇲🇽", label:"México N5",      date:"16 Dic", exclusive:"te-mudaste",        guest:null },
    { slug:"mx6",  flag:"🇲🇽", label:"México N6",      date:"19 Dic", exclusive:"la-corriente",      guest:"Julieta Venegas" },
    { slug:"mx7",  flag:"🇲🇽", label:"México N7",      date:"20 Dic", exclusive:"mojabi-ghost",      guest:null },
    { slug:"mx8",  flag:"🇲🇽", label:"México N8",      date:"21 Dic", exclusive:"soy-el-diablo",     guest:"Natanael Cano + J Balvin" },
    { slug:"cl1",  flag:"🇨🇱", label:"Santiago 1",     date:"9 Ene",  exclusive:"soy-peor",          guest:null },
    { slug:"cl2",  flag:"🇨🇱", label:"Santiago 2",     date:"10 Ene", exclusive:"mayores",           guest:"Becky G" },
    { slug:"cl3",  flag:"🇨🇱", label:"Santiago 3",     date:"11 Ene", exclusive:"solo-de-mi",        guest:"Jowell y Randy" },
    { slug:"pe1",  flag:"🇵🇪", label:"Lima 1",         date:"16 Ene", exclusive:"si-estuviesemos",   guest:null },
    { slug:"pe2",  flag:"🇵🇪", label:"Lima 2",         date:"17 Ene", exclusive:"booker-t",          guest:null },
    { slug:"co1",  flag:"🇨🇴", label:"Medellín 1",     date:"23 Ene", exclusive:"no-me-quiero-casar",guest:"Li Saumet" },
    { slug:"co2",  flag:"🇨🇴", label:"Medellín 2",     date:"24 Ene", exclusive:"tu-no-metes-cabra", guest:"Arcángel" },
    { slug:"co3",  flag:"🇨🇴", label:"Medellín 3",     date:"25 Ene", exclusive:"a-tu-merced",       guest:"Karol G" },
    { slug:"ar1",  flag:"🇦🇷", label:"Buenos Aires 1", date:"13 Feb", exclusive:"otra-noche-miami",  guest:null },
    { slug:"ar2",  flag:"🇦🇷", label:"Buenos Aires 2", date:"14 Feb", exclusive:"una-vez",           guest:null },
    { slug:"ar3",  flag:"🇦🇷", label:"Buenos Aires 3", date:"15 Feb", exclusive:"thunder-y-lightning",guest:null },
    { slug:"sp1",  flag:"🇧🇷", label:"São Paulo 1",    date:"20 Feb", exclusive:"vete",              guest:null },
    { slug:"sp2",  flag:"🇧🇷", label:"São Paulo 2",    date:"21 Feb", exclusive:"te-bote",           guest:null },
    { slug:"syd1", flag:"🇦🇺", label:"Sydney 1",       date:"28 Feb", exclusive:"un-preview",        guest:null },
    { slug:"syd2", flag:"🇦🇺", label:"Sydney 2",       date:"1 Mar",  exclusive:"un-ratito",         guest:null },
    { slug:"bcn1", flag:"🇪🇸", label:"Barcelona 1",    date:"22 May", exclusive:"la-santa",          guest:"Bad Gyal" },
    { slug:"bcn2", flag:"🇪🇸", label:"Barcelona 2",    date:"23 May", exclusive:"triste-br",         guest:"Bryant Myers" },
    { slug:"lis1", flag:"🇵🇹", label:"Lisboa 1",       date:"26 May", exclusive:"estamos-bien",      guest:null },
    { slug:"lis2", flag:"🇵🇹", label:"Lisboa 2",       date:"27 May", exclusive:"ignorantes",        guest:"Sech" },
  ],
  upcomingShows: [
    { slug:"mad1", flag:"🇪🇸", label:"Madrid", date:"30 May" },
  ],
  columns: [
    { id:"25-8",              label:"25/8",            emoji:"♾️",  played:true },
    { id:"despues-playa",     label:"Dsp. Playa",      emoji:"🌊",  played:true },
    { id:"caro",              label:"Caro",             emoji:"💸",  played:true },
    { id:"te-deseo",          label:"Te Deseo",         emoji:"🙏",  played:true },
    { id:"chambea",           label:"Chambea",          emoji:"💼",  played:true },
    { id:"perro-negro",       label:"Perro Negro",      emoji:"🐾",  played:true },
    { id:"amorfoda",          label:"Amorfoda",         emoji:"💔",  played:true },
    { id:"where-she-goes",    label:"Where She Goes",   emoji:"🌍",  played:true },
    { id:"te-mudaste",        label:"Te Mudaste",       emoji:"📦",  played:true },
    { id:"la-corriente",      label:"La Corriente",     emoji:"🌊",  played:true },
    { id:"mojabi-ghost",      label:"Mojabi Ghost",     emoji:"👻",  played:true },
    { id:"soy-el-diablo",     label:"Soy El Diablo",   emoji:"😈",  played:true },
    { id:"soy-peor",          label:"Soy Peor",         emoji:"😤",  played:true },
    { id:"mayores",           label:"Mayores",          emoji:"🔞",  played:true },
    { id:"solo-de-mi",        label:"Solo De Mí",       emoji:"🦋",  played:true },
    { id:"si-estuviesemos",   label:"Si Estuviésemos",  emoji:"💭",  played:true },
    { id:"booker-t",          label:"Booker T",         emoji:"🎯",  played:true },
    { id:"no-me-quiero-casar",label:"No Me Quiero",     emoji:"💍",  played:true },
    { id:"tu-no-metes-cabra", label:"Tú No Metes",      emoji:"🐐",  played:true },
    { id:"a-tu-merced",       label:"A Tu Merced",      emoji:"🎭",  played:true },
    { id:"otra-noche-miami",  label:"Otra Noche",       emoji:"🌃",  played:true },
    { id:"una-vez",           label:"Una Vez",          emoji:"1️⃣",  played:true },
    { id:"thunder-y-lightning",label:"Thunder⚡",       emoji:"⛈️",  played:true },
    { id:"vete",              label:"Vete",             emoji:"💨",  played:true },
    { id:"te-bote",           label:"Te Boté",          emoji:"🗑️",  played:true },
    { id:"un-preview",        label:"UN PREVIEW",       emoji:"👁️",  played:true },
    { id:"un-ratito",         label:"Un Ratito",        emoji:"⏰",  played:true },
    { id:"la-santa",          label:"La Santa",         emoji:"⛪",  played:true },
    { id:"triste-br",         label:"Triste",           emoji:"😢",  played:true },
    { id:"estamos-bien",      label:"Estamos Bien",     emoji:"🤙",  played:true },
    { id:"ignorantes",        label:"Ignorantes",       emoji:"🎭",  played:true },
    // --- CANDIDATAS para Madrid (no en setlist fijo) ---
    { id:"mia",            label:"Mía ft. Drake",     emoji:"💎",  played:false },
    { id:"callaita",       label:"Callaita",           emoji:"🤫",  played:false },
    { id:"solia",          label:"Soliá",              emoji:"⭐",  played:false },
    { id:"moscow-mule",    label:"Moscow Mule",        emoji:"🍹",  played:false },
    { id:"party",          label:"Party",              emoji:"🎉",  played:false },
    { id:"aguacero",       label:"Aguacero",           emoji:"🌧️",  played:false },
    { id:"tarot",          label:"Tarot",              emoji:"🃏",  played:false },
    { id:"otro-atardecer", label:"Otro Atardecer",     emoji:"🌅",  played:false },
    { id:"andrea",         label:"Andrea",             emoji:"👩",  played:false },
    { id:"bien-duro",      label:"Bien Duro",          emoji:"💪",  played:false },
    { id:"cecilia",        label:"Cecilia",            emoji:"🌹",  played:false },
    { id:"sensualidad",    label:"Sensualidad",        emoji:"💃",  played:false },
    { id:"lo-siento",      label:"Lo Siento BB:/",     emoji:"💔",  played:false },
    { id:"la-dificil",     label:"La Difícil",         emoji:"😤",  played:false },
    { id:"pero-ya-no",     label:"Pero Ya No",         emoji:"🚪",  played:false },
    { id:"baticano",       label:"BATICANO",           emoji:"⛪",  played:false },
    { id:"la-romana",      label:"La Romana",          emoji:"🌺",  played:false },
    { id:"trellas",        label:"Trellas",            emoji:"🌟",  played:false },
    { id:"cuevitas",       label:"Cuevitas",           emoji:"🕳️",  played:false },
    { id:"rip",            label:"RIP",                emoji:"☠️",  played:false },
  ]
};

// IDs in setlist fijo — excluidos del heatmap de predicción
const SETLIST_IDS = new Set([
  'titi-me-pregunto','me-porto-bonito','ojitos-lindos','efecto','neverita','el-apagon',
  'safaera','si-veo-a-tu-mama','yo-perreo-sola','bichiyal','monaco','dakiti',
  'callaita','yonaguni','la-cancion',
  'sp-mudanza','sp-pitorro','sp-weltita','sp-turista','sp-baile','sp-nuevayol',
  'sp-velda','sp-voy','sp-cafe','sp-kloufrens','sp-dtmf','sp-eoo'
]);

// Canciones tocadas como exclusivas pero no en SONGS_DATABASE
const EXTRA_EXCLUSIVE_SONGS = [
  {id:'thunder-y-lightning', title:'THUNDER Y LIGHTNING',              theme:'nadiesabe', emoji:'⚡'},
  {id:'mojabi-ghost',        title:'MOJABI GHOST',                     theme:'nadiesabe', emoji:'👻'},
  {id:'coco-chanel',         title:'Coco Chanel (feat. Eladio Carrión)',theme:'nadiesabe', emoji:'💎'},
  {id:'triste-br',           title:'Triste (feat. Bryant Myers)',       theme:'eutdm',    emoji:'😢'},
  {id:'una-vez',             title:'Una Vez (feat. Mora)',              theme:'eutdm',    emoji:'1️⃣'},
  {id:'soy-el-diablo',       title:'Soy El Diablo',                    theme:'singles',  emoji:'👿'},
];

// Alias: exclusive slug → SONGS_DATABASE id
const EX_ALIAS = {
  'despues-playa':'despues-de-la-playa', 'te-deseo':'te-deseo-lo-mejor',
  'si-estuviesemos':'si-estuviesemos-juntos', 'otra-noche-miami':'otra-noche-en-miami',
};

const ALBUM_META = {
  uvst:      { emoji:'☀️', label:'Un Verano Sin Ti' },
  nadiesabe: { emoji:'🌌', label:'Nadie Sabe Lo Que Va a Pasar Mañana' },
  lqnias:    { emoji:'🏠', label:'Las Que No Iban a Salir' },
  eutdm:     { emoji:'🖤', label:'El Último Tour Del Mundo' },
  yhlqmdlg:  { emoji:'🏎️', label:'YHLQMDLG' },
  x100pre:   { emoji:'🎙️', label:'X 100PRE' },
  oasis:     { emoji:'🦎', label:'Oasis' },
  singles:   { emoji:'⭐', label:'Singles & TRAP Era' },
};

function getHeatmapSongs() {
  // Build played-exclusive lookup (exclusive slug → show)
  const playedMap = {};
  TOUR_EXCLUSIVE_DATA.pastShows.forEach(s => {
    if (s.exclusive) {
      const dbId = EX_ALIAS[s.exclusive] || s.exclusive;
      playedMap[dbId] = s;
    }
  });

  // Songs from DB, filtered to exclude core setlist
  const songs = SONGS_DATABASE
    .filter(s => !SETLIST_IDS.has(s.id))
    .map(s => ({ ...s, playedShow: playedMap[s.id] || null }));

  // Add extras (played exclusives not in DB)
  EXTRA_EXCLUSIVE_SONGS.forEach(ex => {
    if (!songs.find(s => s.id === ex.id)) {
      songs.push({ ...ex, year: 0, album: '', playedShow: playedMap[ex.id] || null });
    }
  });

  return songs;
}

function toggleMadrid30Pick(songId) {
  const KEY = 'bb_mad30_top3';
  let picks = JSON.parse(localStorage.getItem(KEY) || '[]');
  const idx = picks.indexOf(songId);
  if (idx > -1) picks.splice(idx, 1);
  else if (picks.length < 3) picks.push(songId);
  else { picks.shift(); picks.push(songId); } // reemplaza el más antiguo
  localStorage.setItem(KEY, JSON.stringify(picks));
  renderSurpriseSection();
}

const CORE_SETLIST = [
  {pos:1, title:"La Mudanza",         emoji:"📦"}, {pos:2,  title:"Callaita",           emoji:"🤫"},
  {pos:3, title:"Pitorro de Coco",    emoji:"🥥"}, {pos:4,  title:"Weltita",             emoji:"🌍"},
  {pos:5, title:"Turista",            emoji:"🧳"}, {pos:6,  title:"Baile Inolvidable",   emoji:"💃"},
  {pos:7, title:"Nuevayol",           emoji:"🗽"}, {pos:8,  title:"Veldá",               emoji:"🔥"},
  {pos:9, title:"Tití Me Preguntó",   emoji:"👵"}, {pos:10, title:"Neverita",            emoji:"🧊"},
  {pos:11,title:"Voy a LLevarte Pa PR",emoji:"🇵🇷"},{pos:12, title:"Si Veo a Tu Mamá",   emoji:"👀"},
  {pos:13,title:"Me Porto Bonito",    emoji:"🩷"}, {pos:14, title:"No Me Conoce Remix",  emoji:"🎭"},
  {pos:15,title:"Bichiyal",           emoji:"🦅"}, {pos:16, title:"Yo Perreo Sola",      emoji:"🕺"},
  {pos:17,title:"Efecto",             emoji:"✨"}, {pos:18, title:"Safaera",             emoji:"🛹"},
  {pos:19,title:"Diles",              emoji:"🗣️"}, {pos:20, title:"MONACO",              emoji:"🏎️"},
  {pos:21,title:"🎲 EXCLUSIVA",        emoji:"🎲"}, {pos:22, title:"Otro Trago",          emoji:"🥃"},
  {pos:23,title:"Café con Ron",       emoji:"☕"}, {pos:24, title:"Ábreme Paso",         emoji:"🚪"},
  {pos:25,title:"Ojitos Lindos",      emoji:"👁️"}, {pos:26, title:"La Canción",          emoji:"🦎"},
  {pos:27,title:"Kloufrens",          emoji:"🔒"}, {pos:28, title:"Dákiti",              emoji:"🚛"},
  {pos:29,title:"Yonaguni",           emoji:"🏝️"}, {pos:30, title:"El Apagón",           emoji:"💡"},
  {pos:31,title:"DTMF",               emoji:"📸"}, {pos:32, title:"Eoo",                 emoji:"🗣️"},
];

// =========================================
// INVITADOS SORPRESA — GUEST TRACKER DATA
// =========================================
const TOUR_GUESTS = [
  { flag:"🇩🇴", city:"Santo Domingo", date:"22 Nov 25", artist:"Romeo Santos",          song:"BOKeTE",                           emoji:"🎸" },
  { flag:"🇨🇷", city:"San José",       date:"5 Dic 25",  artist:"Jhayco",              song:"No Me Conoce / Dákiti / Tarot",    emoji:"🎤" },
  { flag:"🇧🇷", city:"São Paulo 2",    date:"21 Feb 26", artist:"RaiNao",              song:"Perfumito Nuevo",                  emoji:"🌸" },
  { flag:"🇲🇽", city:"México (N2)",    date:"11 Dic 25", artist:"Feid",                song:"Perro Negro",                      emoji:"🐾" },
  { flag:"🇲🇽", city:"México (N4)",    date:"15 Dic 25", artist:"Grupo Frontera",       song:"un x100to",                        emoji:"🪗" },
  { flag:"🇲🇽", city:"México (N6)",    date:"18 Dic 25", artist:"Julieta Venegas",      song:"Lo Siento BB:/ / Ojitos Lindos",   emoji:"🎹" },
  { flag:"🇲🇽", city:"México (N8)",    date:"21 Dic 25", artist:"Natanael Cano",        song:"Soy El Diablo Remix",              emoji:"🎸" },
  { flag:"🇲🇽", city:"México (N8)",    date:"21 Dic 25", artist:"J Balvin",             song:"La Canción / Qué Pretendes",       emoji:"🦎" },
  { flag:"🇨🇱", city:"Santiago (N2)",  date:"10 Ene 26", artist:"Becky G",              song:"Mayores / MAMIII",                 emoji:"💫" },
  { flag:"🇨🇱", city:"Santiago (N3)",  date:"11 Ene 26", artist:"Jowell & Randy",       song:"Safaera",                          emoji:"🛹" },
  { flag:"🇨🇴", city:"Medellín (N1)",  date:"23 Ene 26", artist:"Li Saumet",            song:"Ojitos Lindos",                    emoji:"🌿" },
  { flag:"🇨🇴", city:"Medellín (N2)",  date:"24 Ene 26", artist:"Arcángel",             song:"Me Acostumbré / La Jumpa",         emoji:"🎭" },
  { flag:"🇨🇴", city:"Medellín (N3)",  date:"25 Ene 26", artist:"Karol G",              song:"Ahora Me Llama / Si Antes...",     emoji:"🌸" },
  { flag:"🇦🇷", city:"Buenos Aires 1", date:"Feb 26",    artist:"Mora",                 song:"Una Vez",                          emoji:"🎵" },
  { flag:"🇦🇷", city:"Buenos Aires 2", date:"Feb 26",    artist:"Khea, Duki & Cazzu",   song:"Loca / Con otra",                  emoji:"🇦🇷" },
  { flag:"🇦🇷", city:"Buenos Aires 3", date:"Feb 26",    artist:"Eladio Carrión",       song:"Thunder y Lightning / Coco Chanel",emoji:"⚡" },
  { flag:"🇵🇪", city:"Lima",           date:"Mar 26",    artist:"Ñengo Flow",           song:"Safaera / Qué Malo",               emoji:"🔥" },
  { flag:"🇪🇸", city:"Barcelona 1",    date:"22 May 26", artist:"Bad Gyal",             song:"Toca Toca / Yo Lo Tengo",          emoji:"💎" },
  { flag:"🇪🇸", city:"Barcelona 2",    date:"23 May 26", artist:"Bryant Myers",         song:"Triste",                           emoji:"😢" },
  { flag:"🇵🇹", city:"Lisboa 2",       date:"27 May 26", artist:"Sech",                 song:"Ignorantes / Otro Trago",          emoji:"🎶" },
];

function renderGuestTracker() {
  const el = document.getElementById('stat-guest-tracker');
  if (!el) return;
  el.innerHTML = TOUR_GUESTS.map((g, i) => `
    <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);margin-bottom:3px;">
      <span style="font-size:1rem;">${g.flag}</span>
      <span style="font-size:1.1rem;">${g.emoji}</span>
      <div style="flex:1;min-width:0;">
        <p style="color:white;font-size:0.75rem;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.artist}</p>
        <p style="color:#9ca3af;font-size:0.62rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${g.city} · ${g.date}</p>
      </div>
      <p style="color:#c084fc;font-size:0.6rem;text-align:right;max-width:90px;line-height:1.2;">${g.song}</p>
    </div>`).join('');
}

async function savePicksToSupabase(picks) {
  if (!picks.length) return;
  const sessionId = localStorage.getItem('bb_session_id') ||
    (() => { const id = crypto.randomUUID(); localStorage.setItem('bb_session_id', id); return id; })();
  try {
    await fetch(`${SUPABASE_REST_URL}/rest/v1/surprise_picks?session_id=eq.${sessionId}`, {
      method: 'DELETE',
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}` }
    });
    await fetch(`${SUPABASE_REST_URL}/rest/v1/surprise_picks`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json', Prefer: 'return=minimal'
      },
      body: JSON.stringify(picks.map((songId, i) => ({
        session_id: sessionId, song_id: songId, pick_rank: i + 1, show_slug: 'mad1'
      })))
    });
  } catch(e) { console.log('Could not save picks:', e); }
}

// ---- CONFIRM + SHARE (non-blocking Supabase) ----
function confirmPicks() {
  const picks = JSON.parse(localStorage.getItem('bb_mad30_top3') || '[]');
  if (!picks.length) return;
  // Mark as confirmed locally
  localStorage.setItem('bb_mad30_confirmed', 'true');
  // Fire-and-forget to Supabase — never blocks the UI
  savePicksToSupabase(picks).catch(() => {});
  // Update card UI
  updateShareCard(true);
}

function updateShareCard(justConfirmed) {
  const preview  = document.getElementById('share-picks-preview');
  const btnConf  = document.getElementById('btn-confirm-picks');
  const btnShare = document.getElementById('btn-share-picks');
  if (!preview) return;

  const picks     = JSON.parse(localStorage.getItem('bb_mad30_top3') || '[]');
  const confirmed = localStorage.getItem('bb_mad30_confirmed') === 'true';
  const songs     = getHeatmapSongs();

  if (!picks.length) {
    preview.innerHTML = '<p style="font-size:0.65rem;color:#4b5563;text-align:center;padding:6px 0;">← Pulsa canciones en la tabla para elegir tu Top 3</p>';
    if (btnConf)  { btnConf.disabled  = true;  btnConf.style.opacity  = '0.35'; }
    if (btnShare) { btnShare.disabled = true;  btnShare.style.opacity = '0.35'; }
    return;
  }

  preview.innerHTML = picks.map((id, i) => {
    const s = songs.find(x => x.id === id);
    return `<div style="display:flex;align-items:center;gap:8px;padding:3px 0;">
      <span style="font-size:0.72rem;color:#7c3aed;font-weight:700;width:20px;">#${i+1}</span>
      <span style="font-size:1rem;">${s?.emoji || '🎵'}</span>
      <span style="font-size:0.75rem;color:#e9d5ff;">${s?.title?.split(' (')[0] || id}</span>
    </div>`;
  }).join('');

  if (btnConf) {
    if (confirmed && !justConfirmed) {
      btnConf.textContent = '✓ Predicción confirmada';
      btnConf.style.background = 'rgba(22,163,74,0.4)';
      btnConf.style.borderColor = 'rgba(22,163,74,0.6)';
    } else if (justConfirmed) {
      btnConf.textContent = '✓ ¡Guardada!';
      btnConf.style.background = 'rgba(22,163,74,0.4)';
      setTimeout(() => {
        btnConf.textContent = '✓ Predicción confirmada';
      }, 2000);
    } else {
      btnConf.textContent = '🔮 Confirmar predicción';
      btnConf.style.background = 'linear-gradient(135deg,#7c3aed,#a855f7)';
    }
    btnConf.disabled = false; btnConf.style.opacity = '1';
  }
  if (btnShare) { btnShare.disabled = false; btnShare.style.opacity = '1'; }
}

async function sharePicks() {
  const picks = JSON.parse(localStorage.getItem('bb_mad30_top3') || '[]');
  if (!picks.length) return;
  const songs = getHeatmapSongs();
  const lines = picks.map((id, i) => {
    const s = songs.find(x => x.id === id);
    return `#${i+1} ${s?.emoji || '🎵'} ${s?.title?.split(' (')[0] || id}`;
  });
  const text = `🔮 Mi predicción para Madrid 30 May — DeBÍ TiRAR MáS FOToS Tour:\n${lines.join('\n')}\n\n¿Cuál crees tú? → inflam.github.io/webpage`;
  const btnShare = document.getElementById('btn-share-picks');
  if (navigator.share) {
    try { await navigator.share({ title: '🎲 Mi predicción tour Bad Bunny', text }); return; }
    catch(e) { /* fallback to clipboard */ }
  }
  try {
    await navigator.clipboard.writeText(text);
    if (btnShare) { btnShare.textContent = '✓ Copiado!'; setTimeout(() => { btnShare.textContent = '🌍 Compartir'; }, 2000); }
  } catch(e) {
    if (btnShare) { btnShare.textContent = '⚠️ No se pudo copiar'; setTimeout(() => { btnShare.textContent = '🌍 Compartir'; }, 2000); }
  }
}

async function fetchSurprisePicksStats() {
  const el = document.getElementById('surprise-picks-stats');
  if (!el) return;
  try {
    const res = await fetch(`${SUPABASE_REST_URL}/rpc/get_surprise_picks_stats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`
      },
      body: JSON.stringify({ p_show_slug: 'mad1' })
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    renderSurprisePicksStats(data, el);
  } catch(e) {
    el.innerHTML = '<p style="font-size:0.65rem;color:#6b7280;text-align:center;padding:8px;">Sin predicciones aún — ¡ejecuta el SQL en Supabase y sé el primero! 🔮</p>';
  }
}

function renderSurprisePicksStats(data, el) {
  if (!data || !data.top_picks || !data.top_picks.length) {
    el.innerHTML = '<p style="font-size:0.65rem;color:#6b7280;text-align:center;padding:8px;">Sin predicciones aún — ¡sé el primero! 🔮</p>';
    return;
  }
  const allSongs = getHeatmapSongs();
  const total = data.total_voters || 0;
  const top = data.top_picks.slice(0, 10);
  const maxCount = top[0]?.pick_count || 1;
  el.innerHTML = `
    <p style="font-size:0.6rem;color:#6b7280;margin-bottom:6px;">${total} fan${total!==1?'s':''} ha${total!==1?'n':''} confirmado su Top 3 · Madrid 30 May</p>
    ${top.map((p, i) => {
      const song = allSongs.find(s => s.id === p.song_id);
      const pct = Math.round((p.pick_count / (total * 3 || 1)) * 100);
      const bar = Math.round((p.pick_count / maxCount) * 100);
      return `<div style="margin-bottom:5px;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
          <span style="font-size:0.7rem;color:#6b7280;width:14px;text-align:right;">${i+1}</span>
          <span style="font-size:0.8rem;">${song?.emoji || '🎵'}</span>
          <span style="font-size:0.68rem;color:#e5e7eb;flex:1;">${song?.title?.split(' (')[0] || p.song_id}</span>
          <span style="font-size:0.65rem;color:#c084fc;font-weight:700;">${p.pick_count}×</span>
          <span style="font-size:0.58rem;color:#6b7280;">${pct}%</span>
        </div>
        <div style="height:4px;border-radius:2px;background:rgba(255,255,255,0.05);overflow:hidden;margin-left:20px;">
          <div style="height:100%;width:${bar}%;background:linear-gradient(90deg,#7c3aed,#c084fc);border-radius:2px;transition:width 0.6s;"></div>
        </div>
      </div>`;
    }).join('')}`;
}


function renderSurpriseSection() {
  const heatmapEl = document.getElementById('stat-surprise-heatmap');
  const setlistEl = document.getElementById('stat-core-setlist');
  if (!heatmapEl) return;

  // Core setlist sidebar
  if (setlistEl) {
    setlistEl.innerHTML = CORE_SETLIST.map(s => `
      <div style="display:flex;align-items:center;gap:5px;padding:2px 4px;border-radius:4px;background:${s.title.startsWith('🎲')?'rgba(139,92,246,0.2)':'rgba(255,255,255,0.03)'}">
        <span style="color:#6b7280;font-size:0.65rem;width:16px;text-align:right;">${s.pos}</span>
        <span style="font-size:0.8rem;">${s.emoji}</span>
        <span style="color:${s.title.startsWith('🎲')?'#c084fc':'#d1d5db'};font-size:0.7rem;font-weight:${s.title.startsWith('🎲')?700:400};">${s.title}</span>
      </div>`).join('');
  }

  const picks = JSON.parse(localStorage.getItem('bb_mad30_top3') || '[]');
  const songs = getHeatmapSongs();

  // Group by album theme in order
  const ALBUM_ORDER = ['uvst','nadiesabe','eutdm','lqnias','yhlqmdlg','x100pre','oasis','singles'];
  const grouped = {};
  ALBUM_ORDER.forEach(t => { grouped[t] = []; });
  songs.forEach(s => {
    const t = s.theme || 'singles';
    if (!grouped[t]) grouped[t] = [];
    grouped[t].push(s);
  });

  // Top 3 pick bar
  const pickBar = `
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:8px 10px;margin-bottom:8px;border-radius:8px;background:rgba(139,92,246,0.1);border:1px solid rgba(139,92,246,0.25);">
      <span style="font-size:0.65rem;color:#c084fc;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;">🔮 Tu Top 3 · Madrid 30 May</span>
      ${[0,1,2].map(i => {
        const id = picks[i];
        const song = id ? songs.find(s => s.id === id) : null;
        return `<span style="padding:2px 8px;border-radius:20px;font-size:0.62rem;background:${song?'rgba(139,92,246,0.3)':'rgba(255,255,255,0.05)'};border:1px solid ${song?'rgba(139,92,246,0.5)':'rgba(255,255,255,0.1)'};color:${song?'#e9d5ff':'#4b5563'};">
          ${song ? `#${i+1} ${song.emoji} ${song.title.split(' (')[0]}` : `#${i+1} —`}
        </span>`;
      }).join('')}
      <span style="font-size:0.58rem;color:#6b7280;margin-left:auto;">Pulsa una canción · max 3</span>
    </div>`;

  // Build rows grouped by album
  let rowsHtml = '';
  ALBUM_ORDER.forEach(theme => {
    const albumSongs = grouped[theme];
    if (!albumSongs || !albumSongs.length) return;
    const meta = ALBUM_META[theme] || { emoji: '🎵', label: theme };

    rowsHtml += `<tr>
      <td colspan="3" style="padding:8px 4px 3px;pointer-events:none;">
        <span style="font-size:0.62rem;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.07em;">${meta.emoji} ${meta.label}</span>
      </td>
    </tr>`;

    albumSongs.forEach(song => {
      const playedShow = song.playedShow;
      const pickIdx = picks.indexOf(song.id);
      const isPicked = pickIdx > -1;
      const tooltip = playedShow
        ? `★ ${playedShow.flag} ${playedShow.label} · ${playedShow.date}${playedShow.guest ? ' · 🌟 ' + playedShow.guest : ''}`
        : (isPicked ? `#${pickIdx+1} en tu top 3` : 'Añadir a tu Top 3');

      const rowBg = playedShow
        ? 'rgba(253,224,71,0.04)'
        : (isPicked ? 'rgba(139,92,246,0.12)' : 'transparent');

      rowsHtml += `<tr title="${tooltip}" onclick="${playedShow ? '' : `toggleMadrid30Pick('${song.id}')`}"
        style="background:${rowBg};cursor:${playedShow?'default':'pointer'};border-radius:4px;"
        onmouseover="if(!${!!playedShow})this.style.background='rgba(255,255,255,0.05)'"
        onmouseout="this.style.background='${rowBg}'">
        <td style="padding:3px 6px 3px 2px;white-space:nowrap;">
          <span style="font-size:0.85rem;">${song.emoji}</span>
          <span style="font-size:0.72rem;color:${playedShow?'#9ca3af':(isPicked?'#e9d5ff':'#d1d5db')};margin-left:3px;${playedShow?'text-decoration:line-through;opacity:0.7':''}">${song.title.split(' (')[0]}</span>
          ${song.title.includes('(') ? `<span style="font-size:0.58rem;color:#6b7280;"> ${song.title.match(/\(.*\)/)?.[0]||''}</span>` : ''}
        </td>
        <td style="text-align:center;padding:3px 4px;min-width:44px;">
          ${playedShow
            ? `<span style="font-size:0.9rem;color:#fde047;" title="${tooltip}">★</span><div style="font-size:0.45rem;color:#6b7280;">${playedShow.flag} ${playedShow.label}</div>`
            : `<span style="font-size:0.4rem;color:#1f2937;">·</span>`}
        </td>
        <td style="text-align:center;padding:3px 4px;min-width:44px;">
          ${playedShow
            ? `<span style="font-size:0.4rem;color:#1f2937;">—</span>`
            : (isPicked
              ? `<span style="font-size:0.75rem;font-weight:700;color:#c084fc;">#${pickIdx+1}</span>`
              : `<span style="font-size:0.5rem;color:#374151;">·</span>`)}
        </td>
      </tr>`;
    });
  });

  heatmapEl.innerHTML = `
    ${pickBar}
    <div style="overflow-x:auto;">
    <table style="border-collapse:separate;border-spacing:1px;width:100%;min-width:280px;">
      <thead><tr style="vertical-align:bottom;">
        <th style="text-align:left;padding-bottom:4px;font-size:0.58rem;color:#6b7280;text-transform:uppercase;">Canción</th>
        <th style="min-width:44px;text-align:center;padding-bottom:4px;font-size:0.58rem;color:#fde047;text-transform:uppercase;">★ Tocada</th>
        <th style="min-width:44px;text-align:center;padding-bottom:4px;font-size:0.58rem;color:#c084fc;text-transform:uppercase;background:rgba(139,92,246,0.08);border-radius:4px 4px 0 0;">🔮 30 May</th>
      </tr></thead>
      <tbody>${rowsHtml}</tbody>
    </table>
    </div>
    <p style="font-size:0.55rem;color:#4b5563;text-align:right;margin-top:6px;">★ tocada como exclusiva · hover para ver concierto · <a href="https://dtmftracker.com/exclusives" target="_blank" style="color:#6b7280;">dtmftracker.com</a></p>`;
  updateShareCard();
}


async function fetchGlobalStats() {
  try {
    const res = await fetch(`${SUPABASE_REST_URL}/rpc/get_global_stats`, {
      method: "POST", // RPC via POST
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_ANON_KEY,
        "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    renderGlobalStats(data);
  } catch (error) {
    console.log("Error fetching stats", error);
    document.getElementById("stats-loading").innerHTML = `<p class="text-red-400">Error cargando datos. ¿Ejecutaste el código SQL en Supabase?</p>`;
  }
}

function renderGlobalStats(data) {
  document.getElementById("stats-loading").classList.add("hidden");
  document.getElementById("stats-content").classList.remove("hidden");
  
  // Community Stats
  if (data.community_stats) {
    document.getElementById("stat-comm-classic").textContent = (data.community_stats.total_classic || 0).toLocaleString();
    document.getElementById("stat-comm-survivor").textContent = (data.community_stats.total_survivor || 0).toLocaleString();
    document.getElementById("stat-comm-quizzes").textContent = (data.community_stats.total_quizzes || 0).toLocaleString();
  }
  
  // Hero Stat: El Número 1
  const totalClassic = data.total_classic || 0;
  if (data.global_champion && data.global_champion.song_id) {
    const champSong = findSongById(data.global_champion.song_id);
    if (champSong) {
      document.getElementById("stat-hero-icon").textContent = champSong.emoji;
      document.getElementById("stat-hero-title").textContent = champSong.title;
      document.getElementById("stat-hero-winrate").textContent = currentLang === 'en' 
        ? `Wins ${Math.round(data.global_champion.win_rate)}% of its duels` 
        : `Gana el ${Math.round(data.global_champion.win_rate)}% de sus duelos`;
      document.getElementById("stat-hero-tournaments").textContent = currentLang === 'en'
        ? `Champion in ${data.global_champion.tournament_wins} of ${totalClassic} Copa${totalClassic !== 1 ? 's' : ''}`
        : `Campeón en ${data.global_champion.tournament_wins} de ${totalClassic} Copa${totalClassic !== 1 ? 's' : ''} jugadas`;
    }
  } else {
    document.getElementById("stat-hero-title").textContent = currentLang === 'en' ? "Waiting for votes..." : "Aún sin datos...";
    document.getElementById("stat-hero-winrate").textContent = "-";
    document.getElementById("stat-hero-tournaments").textContent = "-";
  }
  
  // Copa Top 5
  const copaTop5Container = document.getElementById("stat-copa-top5");
  copaTop5Container.innerHTML = "";
  if (data.copa_top5 && data.copa_top5.length > 0) {
    const medals = ["🥇", "🥈", "🥉", "4️⃣", "5️⃣"];
    data.copa_top5.forEach((item, index) => {
      const song = findSongById(item.song_id);
      const title = song ? song.title : item.song_id;
      const emoji = song ? song.emoji : "🎵";
      const cupWins = item.tournament_wins > 0 ? `🏆 ${item.tournament_wins}` : "";
      copaTop5Container.innerHTML += `
        <div style="display:flex; align-items:center; gap:10px; background:rgba(0,0,0,0.4); padding:8px 12px; border-radius:10px; border:1px solid rgba(142,45,226,0.3);">
          <span style="font-size:1.2rem; width:24px; text-align:center;">${medals[index]}</span>
          <span style="font-size:1.1rem;">${emoji}</span>
          <div style="flex:1;">
            <p style="font-weight:700; color:white; font-size:0.875rem; line-height:1.3;">${title}</p>
          </div>
          <div style="display:flex; flex-direction:column; align-items:flex-end; gap:2px;">
            ${cupWins ? `<span style="font-size:0.7rem; color:#c084fc; font-weight:700;">${cupWins} ${currentLang === 'en' ? 'copa' : 'copa'}</span>` : ""}
            <span style="font-size:0.7rem; color:#6b7280;">${item.wins}W / ${item.total_duels}D</span>
          </div>
        </div>
      `;
    });
  } else {
    copaTop5Container.innerHTML = `<p style="color:#6b7280; text-align:center; font-size:0.875rem;">Sin datos aún</p>`;
  }

  // Hardest Duels (by avg response time)
  const hardestDuelsContainer = document.getElementById("stat-hardest-duels");
  if (hardestDuelsContainer) {
    hardestDuelsContainer.innerHTML = "";
    if (data.hardest_duel && data.hardest_duel.length > 0) {
      const thinkEmojis = ["🤔","😤","😬"];
      data.hardest_duel.forEach((item, idx) => {
        const songA = findSongById(item.song_a);
        const songB = findSongById(item.song_b);
        const titleA = songA ? `${songA.emoji} ${songA.title}` : item.song_a;
        const titleB = songB ? `${songB.emoji} ${songB.title}` : item.song_b;
        hardestDuelsContainer.innerHTML += `
          <div style="display:flex; align-items:center; gap:8px; padding:9px 12px; border-radius:9px; background:rgba(126,34,206,0.12); border:1px solid rgba(168,85,247,0.25); margin-bottom:5px;">
            <span style="font-size:1.2rem; width:24px; text-align:center;">${thinkEmojis[idx]}</span>
            <div style="flex:1; min-width:0;">
              <p style="font-weight:700; color:white; font-size:0.8rem; word-break:break-word; line-height:1.3;">${titleA} <span style="color:#a78bfa;">vs</span> ${titleB}</p>
            </div>
            <span style="font-weight:800; color:#c084fc; font-size:0.9rem; white-space:nowrap;">${item.avg_seconds}s máx</span>
          </div>`;
      });
    } else {
      hardestDuelsContainer.innerHTML = `<p style="color:#6b7280; font-size:0.85rem; text-align:center; font-style:italic;">Acumulando datos de partidas...</p>`;
    }
  }
  
  // Tour Mode Insights
  if (data.tour_champion && data.tour_champion.song_id) {
    const tourSong = findSongById(data.tour_champion.song_id);
    if (tourSong) {
      document.getElementById("stat-tour-anticipated").textContent = `${tourSong.emoji} ${tourSong.title}`;
      document.getElementById("stat-tour-anticipated-wins").textContent = currentLang === 'en' 
        ? `${data.tour_champion.wins} tour wins` 
        : `${data.tour_champion.wins} victorias en el Tour`;
    } else {
      document.getElementById("stat-tour-anticipated").textContent = data.tour_champion.song_id;
      document.getElementById("stat-tour-anticipated-wins").textContent = currentLang === 'en' 
        ? `${data.tour_champion.wins} tour wins` 
        : `${data.tour_champion.wins} victorias en el Tour`;
    }
  } else {
    document.getElementById("stat-tour-anticipated").textContent = "N/A";
  }
  
  // Top 5 Setlist
  const setlistContainer = document.getElementById("stat-setlist-container");
  setlistContainer.innerHTML = "";
  if (data.top_setlist && data.top_setlist.length > 0) {
    data.top_setlist.forEach((item, index) => {
      const song = findSongById(item.song_id);
      if (song) {
        setlistContainer.innerHTML += `
          <div class="flex items-center gap-3 bg-black bg-opacity-40 p-2 rounded-lg border border-gray-800">
            <span class="text-orange-500 font-black italic text-lg w-4">${index + 1}</span>
            <span class="text-xl">${song.emoji}</span>
            <div class="flex-1">
              <p class="font-bold text-white text-sm leading-tight truncate">${song.title}</p>
            </div>
            <span class="text-xs text-gray-500">${item.count} votos</span>
          </div>
        `;
      } else {
        setlistContainer.innerHTML += `
          <div class="flex items-center gap-3 bg-black bg-opacity-40 p-2 rounded-lg border border-gray-800">
            <span class="text-orange-500 font-black italic text-lg w-4">${index + 1}</span>
            <span class="text-xl">🎵</span>
            <div class="flex-1">
              <p class="font-bold text-white text-sm leading-tight truncate">${item.song_id}</p>
            </div>
            <span class="text-xs text-gray-500">${item.count} votos</span>
          </div>
        `;
      }
    });
  } else {
    setlistContainer.innerHTML = `<p class="text-sm italic text-gray-500">${currentLang === 'en' ? 'Still waiting for the fandom to decide 👀' : 'Esperando a que el fandom decida 👀'}</p>`;
  }
  
  // Quiz Insights: Hardest
  const hardestContainer = document.getElementById("stat-quiz-hardest");
  hardestContainer.innerHTML = "";
  if (data.quiz_hardest && data.quiz_hardest.length > 0) {
    const hMedals = ['💀','😅','😬'];
    data.quiz_hardest.slice(0, 3).forEach((item, idx) => {
      const song = findSongById(item.song_id);
      if (!song) return;
      const total = item.total_attempts || item.fails;
      const failRate = total > 0 ? Math.round((item.fails / total) * 100) : 0;
      hardestContainer.innerHTML += `
        <div style="display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:8px; background:rgba(255,75,43,0.08); border:1px solid rgba(255,75,43,0.2); margin-bottom:5px;">
          <span style="font-size:1.1rem; width:24px; text-align:center;">${hMedals[idx]}</span>
          <span style="font-size:1rem;">${song.emoji}</span>
          <div style="flex:1;">
            <p style="font-weight:700; color:white; font-size:0.8rem;">${song.title}</p>
          </div>
          <span style="font-size:0.75rem; font-weight:700; color:#f87171;">${failRate}% fallos</span>
        </div>`;
    });
  } else {
    hardestContainer.innerHTML = `<p style="color:#6b7280; font-size:0.85rem; font-style:italic;">N/A</p>`;
  }
  
  // Quiz Insights: Fastest
  const fastestContainer = document.getElementById("stat-quiz-fastest");
  fastestContainer.innerHTML = "";
  if (data.quiz_fastest && data.quiz_fastest.length > 0) {
    const fMedals = ['⚡','🎵','🎶'];
    data.quiz_fastest.slice(0, 3).forEach((item, idx) => {
      const song = findSongById(item.song_id);
      if (!song) return;
      const secs = (item.avg_time / 1000).toFixed(1);
      fastestContainer.innerHTML += `
        <div style="display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:8px; background:rgba(56,239,125,0.08); border:1px solid rgba(56,239,125,0.2); margin-bottom:5px;">
          <span style="font-size:1.1rem; width:24px; text-align:center;">${fMedals[idx]}</span>
          <span style="font-size:1rem;">${song.emoji}</span>
          <div style="flex:1;">
            <p style="font-weight:700; color:white; font-size:0.8rem;">${song.title}</p>
          </div>
          <span style="font-size:0.8rem; font-weight:700; color:#34d399;">${secs}s</span>
        </div>`;
    });
  } else {
    fastestContainer.innerHTML = `<p style="color:#6b7280; font-size:0.85rem; font-style:italic;">N/A</p>`;
  }

  // Quiz: Global Top 3 Scores
  const pbContainer = document.getElementById("stat-quiz-personal-best");
  if (pbContainer) {
    if (data.quiz_top3 && data.quiz_top3.length > 0) {
      const medals = ['🥇','🥈','🥉'];
      pbContainer.innerHTML = data.quiz_top3.map((e, i) => `
        <div style="display:flex; align-items:center; gap:10px; padding:9px 12px; border-radius:9px; background:${i===0?'rgba(253,224,71,0.1)':'rgba(255,255,255,0.04)'}; border:1px solid ${i===0?'rgba(253,224,71,0.3)':'rgba(255,255,255,0.08)'};">
          <span style="font-size:${i===0?'1.6rem':'1.2rem'}; width:28px; text-align:center;">${medals[i]}</span>
          <div style="flex:1;">
            <p style="font-weight:700; color:white; font-size:${i===0?'0.95rem':'0.85rem'};">⚡ ${e.correct_answers}/10 correctas &nbsp;·&nbsp; ${e.avg_seconds}s promedio</p>
            <p style="font-size:0.7rem; color:#9ca3af;">${e.played_date}</p>
          </div>
          <div style="font-weight:800; color:#ffd700; font-size:${i===0?'1.05rem':'0.9rem'};">${Number(e.score).toLocaleString()} pts</div>
        </div>`).join('');
    } else {
      pbContainer.innerHTML = `<p class="italic text-gray-500 text-sm">Sin quizzes jugados aún — ¡sé el primero!</p>`;
    }
  }

  // Canción Sorpresa heatmap + guests (static data)
  renderSurpriseSection();
  renderGuestTracker();
}

function showTourTracker() {
  document.getElementById("mode-selection-screen").classList.add("hidden");
  document.getElementById("tour-tracker-screen").classList.remove("hidden");
  if (typeof trackEvent === 'function') trackEvent('tour_tracker_viewed');
  renderSurpriseSection();
  renderGuestTracker();
}

function showGlobalStats() {
  document.getElementById("mode-selection-screen").classList.add("hidden");
  document.getElementById("config-screen").classList.add("hidden");
  const statsScreen = document.getElementById("global-stats-screen");
  statsScreen.classList.remove("hidden");
  
  if (typeof trackEvent === 'function') trackEvent('global_results_viewed');

  // Show loading state
  document.getElementById("stats-loading").classList.remove("hidden");
  document.getElementById("stats-content").classList.add("hidden");
  document.getElementById("stats-loading").innerHTML = `
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
    <p class="text-gray-400">Analizando miles de votos...</p>
  `;
  
  fetchGlobalStats();
  fetchSurprisePicksStats(); // load community predictions concurrently
}

// =========================================
// =========================================
// I18N (INTERNATIONALIZATION)
// =========================================
const TRANSLATIONS = {
  es: {
    app_title: "LA COPA CONEJO",
    app_subtitle: "Prepárate para el DeBÍ TiRAR MáS FOToS World Tour",
    mode_title: "Elige tu Modo",
    mode_desc: "Torneos, setlist y quiz para llegar al concierto sin fallar una.",
    mode_classic_title: "🏆 Copa Total",
    mode_classic_desc: "Todas las eras. Todas las canciones. Solo una sobrevive.",
    mode_survivor_title: "🎟️ Modo Tour",
    mode_survivor_desc: "Juega con el setlist y descubre qué canción estás esperando más.",
    mode_quiz_title: "⚡ 15 Segundos",
    mode_quiz_desc: "Escucha el fragmento, adivina rápido y reta a tus amigos.",
    btn_back_home: "<span>🏠</span> Volver",
    btn_exit: "<span>🏠</span> Salir",
    btn_abandon: "<span>🏠</span> Abandonar",
    config_title: "Elige el Tamaño del Torneo",
    config_desc: "Enfréntalas 1v1 en eliminatorias directas hasta descubrir tu favorita.",
    config_8: "8 Canciones",
    config_16: "16 Canciones",
    config_32: "32 Canciones",
    config_64: "64 Canciones",
    config_albums: "Selecciona las Eras / Álbumes a Incluir",
    btn_start: "INICIAR TORNEO",
    tab_arena: "🏟️ La Arena (1v1)",
    tab_bracket: "📊 Cuadro (Bracket)",
    badge_option_a: "OPCIÓN A",
    badge_option_b: "OPCIÓN B",
    btn_choose: "Me quedo con esta",
    arena_hint: "Puedes usar las flechas ⬅️ ➡️ o teclas A/D para votar. Pulsa 🎧 para escuchar un fragmento.",
    bracket_hint: "Desliza horizontalmente para ver el cuadro completo del torneo.",
    winner_title: "¡Tenemos Ganadora!",
    winner_desc: "Tu canción favorita absoluta de Bad Bunny es:",
    badge_champion: "👑 CAMPEONA",
    btn_share_winner: "Compartir mi campeona 🐰",
    btn_share_setlist: "Compartir mi setlist 🐰",
    ranking_title: "Tu Top de Canciones",
    btn_view_bracket: "Ver Cuadro Completo 📊",
    btn_play_again: "JUGAR DE NUEVO",
    quiz_hint: "¿Qué canción está sonando?",
    quiz_completed: "¡Trivia Completada!",
    quiz_correct: "Aciertos:",
    quiz_avg_time: "Tiempo Promedio:",
    quiz_total_score: "Puntuación Total:",
    quiz_leaderboard: "🏆 Mejores Puntuaciones",
    btn_challenge: "Retar a mis amigos 🔥",
    btn_refresh: "Actualizar Resultados",
    footer_text: "A disfrutaaaar 🐰🔥💥",
    mode_stats_title: "📊 Resultados Globales",
    mode_stats_desc: "Descubre lo que vota el resto del mundo en tiempo real.",
    stats_title: "El Fandom Ha Hablado",
    stats_desc: "Métricas en tiempo real de todos los jugadores.",
    stats_champion_label: "Canción más ganadora",
    stats_duel_label: "El duelo más reñido",
    stats_setlist_label: "Top 5 Tour Setlist",
    
    // Dynamic JS texts
    pool_count: "{count} canciones disponibles",
    pool_error: "⚠️ Necesitas al menos {size} canciones seleccionadas (tienes {count}). Activa más álbumes.",
    match_progress: "Enfrentamiento {current} de {total}",
    survivor_progress: "El Setlist del Tour <span class='text-xs ml-2 text-gray-400'>Restantes: {count}</span>",
    round_64: "Treintaidosavos de Final",
    round_32: "Dieciseisavos de Final",
    round_16: "Octavos de Final",
    round_8: "Cuartos de Final",
    round_4: "Semifinales",
    round_2: "🔥 Gran Final 🔥",
    round_default: "Torneo Bad Bunny",
    survivor_champ: "👑 Defendiendo (Rachas: {streak})",
    survivor_challenger: "⚔️ Nuevo rival",
    survivor_leaderboard_champ: "👑 Campeón Actual: {title}",
    survivor_leaderboard_wins: "{streak} Victorias",
    survivor_cemetery: "Cementerio (Eliminados)",
    quiz_question: "Pregunta {current}/{total}",
    share_classic_text: "Mi canción campeona de Bad Bunny es {title} 🏆 Soy de la era {album}: {personality}. ¡Descubre la tuya! 🐰🔥",
    share_survivor_hint: "🎶 <strong>¡Estate atenta!</strong> Esta canción suele salir en el número <strong>{pos}</strong> en este tour.",
    share_survivor_text: "Mi canción soñada para el tour de Bad Bunny es {title} 🏆 ¡Suele salir en la posición {pos}! ¿Cuál es la tuya? 🐰🔥",
    share_survivor_exclusive_hint: "🤫 <strong>¡Ojalá la cante!</strong> Esta canción es tan especial que tendría que ser la sorpresa exclusiva del tour.",
    share_survivor_exclusive_text: "Mi canción soñada para el tour de Bad Bunny es {title} 🏆 ¡Tendría que ser la sorpresa exclusiva del concierto! ¿Cuál es la tuya? 🐰🔥",
    share_quiz_text: "Reto Bad Bunny 🐰: He sacado {correct}/10 aciertos con un promedio de {time}s por canción (Puntos: {score}) 🔥 ¿Tú cuánto sacas?"
  },
  en: {
    app_title: "THE BUNNY CUP",
    app_subtitle: "Get ready for the DeBÍ TiRAR MáS FOToS World Tour",
    mode_title: "Choose Your Mode",
    mode_desc: "Tournaments, setlist and quiz to arrive at the concert without missing a beat.",
    mode_classic_title: "🏆 Total Cup",
    mode_classic_desc: "All eras. All songs. Only one survives.",
    mode_survivor_title: "🎟️ Tour Mode",
    mode_survivor_desc: "Play with the setlist and discover which song you are waiting for the most.",
    mode_quiz_title: "⚡ 15 Seconds",
    mode_quiz_desc: "Listen to the snippet, guess fast and challenge your friends.",
    btn_back_home: "<span>🏠</span> Back",
    btn_exit: "<span>🏠</span> Exit",
    btn_abandon: "<span>🏠</span> Quit",
    config_title: "Choose Tournament Size",
    config_desc: "Face them off 1v1 in direct eliminations until you find your absolute favorite.",
    config_8: "8 Songs",
    config_16: "16 Songs",
    config_32: "32 Songs",
    config_64: "64 Songs",
    config_albums: "Select Eras / Albums to Include",
    btn_start: "START TOURNAMENT",
    tab_arena: "🏟️ The Arena (1v1)",
    tab_bracket: "📊 Bracket",
    badge_option_a: "OPTION A",
    badge_option_b: "OPTION B",
    btn_choose: "I'll take this one",
    arena_hint: "You can use ⬅️ ➡️ arrows or A/D keys to vote. Press 🎧 to listen to a snippet.",
    bracket_hint: "Swipe horizontally to see the full tournament bracket.",
    winner_title: "We Have a Winner!",
    winner_desc: "Your absolute favorite Bad Bunny song is:",
    badge_champion: "👑 CHAMPION",
    btn_share_winner: "Share my champion 🐰",
    btn_share_setlist: "Share my setlist 🐰",
    ranking_title: "Your Top Songs",
    btn_view_bracket: "View Full Bracket 📊",
    btn_play_again: "PLAY AGAIN",
    quiz_hint: "What song is playing?",
    quiz_completed: "Trivia Completed!",
    quiz_correct: "Correct:",
    quiz_avg_time: "Avg Time:",
    quiz_total_score: "Total Score:",
    quiz_leaderboard: "🏆 Leaderboard",
    btn_challenge: "Challenge my friends 🔥",
    btn_refresh: "Refresh Results",
    footer_text: "Enjoyyy 🐰🔥💥",
    mode_stats_title: "📊 Global Results",
    mode_stats_desc: "Discover what the rest of the world is voting for in real time.",
    stats_title: "The Fandom Has Spoken",
    stats_desc: "Real-time metrics from all players.",
    stats_champion_label: "Most winning song",
    stats_duel_label: "Closest duel",
    stats_setlist_label: "Top 5 Tour Setlist",
    
    // Dynamic JS texts
    pool_count: "{count} songs available",
    pool_error: "⚠️ You need at least {size} songs selected (you have {count}). Enable more albums.",
    pool_warning_64: "⚠️ The 64-song tournament is a marathon! Get ready for an intense session.",
    match_progress: "Matchup {current} of {total}",
    survivor_progress: "Tour Setlist <span class='text-xs ml-2 text-gray-400'>{count} remaining</span>",
    round_64: "Round of 64",
    round_32: "Round of 32",
    round_16: "Round of 16",
    round_8: "Quarterfinals",
    round_4: "Semifinales",
    round_2: "🔥 Grand Final 🔥",
    round_default: "Bad Bunny Tournament",
    survivor_champ: "👑 Defending (Streak: {streak})",
    survivor_challenger: "⚔️ New rival",
    survivor_leaderboard_champ: "👑 Current Champ: {title}",
    survivor_leaderboard_wins: "{streak} Wins",
    survivor_cemetery: "Graveyard (Eliminated)",
    quiz_question: "Question {current}/{total}",
    share_classic_text: "My ultimate Bad Bunny champion is {title} 🏆 I'm from the {album} era: {personality}. Find out yours! 🐰🔥",
    share_survivor_hint: "🎶 <strong>Heads up!</strong> This song usually plays at number <strong>{pos}</strong> on this tour.",
    share_survivor_text: "My dream song for the Bad Bunny tour is {title} 🏆 It usually plays at position {pos}! What's yours? 🐰🔥",
    share_survivor_exclusive_hint: "🤫 <strong>I wish!</strong> This song is so special it would have to be the exclusive surprise of the concert.",
    share_survivor_exclusive_text: "My dream song for the Bad Bunny tour is {title} 🏆 It would have to be the exclusive surprise of the concert! What's yours? 🐰🔥",
    share_quiz_text: "Bad Bunny Challenge 🐰: I got {correct}/10 correct with an average of {time}s per song (Score: {score}) 🔥 Can you beat me?"
  }
};

let currentLang = localStorage.getItem("bb_lang") || "es";

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("bb_lang", lang);
  
  // Update toggle buttons
  document.getElementById("lang-btn-es").className = lang === "es" ? "lang-btn active px-3 py-1 text-sm font-bold rounded-full transition-colors text-white bg-white bg-opacity-20" : "lang-btn px-3 py-1 text-sm font-bold rounded-full transition-colors text-gray-400 hover:text-white";
  document.getElementById("lang-btn-en").className = lang === "en" ? "lang-btn active px-3 py-1 text-sm font-bold rounded-full transition-colors text-white bg-white bg-opacity-20" : "lang-btn px-3 py-1 text-sm font-bold rounded-full transition-colors text-gray-400 hover:text-white";
  
  // Update all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (TRANSLATIONS[currentLang][key]) {
      el.innerHTML = TRANSLATIONS[currentLang][key];
    }
  });

  // Re-render any dynamic UI if needed (like the pool count, match progress, etc)
  if (typeof validateAlbumSelection === "function") validateAlbumSelection();
}

// Call on init
document.addEventListener("DOMContentLoaded", () => {
  setLanguage(currentLang);
});

// Base de datos de canciones de Bad Bunny con metadatos y estilos visuales por era/álbum (Álbumes y Singles Originales)
const SONGS_DATABASE = [
  {
    id: "desde-el-corazon",
    title: "Desde el Corazón",
    album: "Singles",
    year: 2018,
    theme: "singles",
    emoji: "❤️",
    previewUrl: null
  },
  {
    id: "titi-me-pregunto",
    title: "Tití Me Preguntó",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🏖️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ee/c1/61/eec16130-2d09-e5a6-891e-21178c56436a/mzaf_507894679185476986.plus.aac.p.m4a"
  },
  {
    id: "me-porto-bonito",
    title: "Me Porto Bonito (feat. Chencho Corleone)",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🔥",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9a/84/a2/9a84a2ea-eb19-12e2-2aaf-627fdee22545/mzaf_17649029454870883985.plus.aac.p.m4a"
  },
  {
    id: "ojitos-lindos",
    title: "Ojitos Lindos (feat. Bomba Estéreo)",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "👁️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/72/ae/81/72ae81c2-4ef3-b998-40b6-563c0609509f/mzaf_12868850384306577273.plus.aac.p.m4a"
  },
  {
    id: "efecto",
    title: "Efecto",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "⚡",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/4e/ec/7b/4eec7bd9-982c-bb39-4acb-77d724502e8a/mzaf_9582878707075648609.plus.aac.p.m4a"
  },
  {
    id: "moscow-mule",
    title: "Moscow Mule",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🍹",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9b/3a/85/9b3a85d7-3544-0a83-76cf-18dd022e143b/mzaf_2334221945359492587.plus.aac.p.m4a"
  },
  {
    id: "neverita",
    title: "Neverita",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🕶️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/23/26/dd/2326dd0b-f117-306c-8454-be8934ffb402/mzaf_18297346266039659444.plus.aac.p.m4a"
  },
  {
    id: "despues-de-la-playa",
    title: "Después de la Playa",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🎷",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/f6/c6/a0/f6c6a092-1690-3328-907d-280a8ba6adac/mzaf_4195200870757777362.plus.aac.p.m4a"
  },
  {
    id: "tarot",
    title: "Tarot (feat. Jhayco)",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🃏",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/93/23/dd/9323ddbb-4a2c-249b-9e39-88703c567f41/mzaf_12486720115800977792.plus.aac.p.m4a"
  },
  {
    id: "un-ratito",
    title: "Un Ratito",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "⏳",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/43/b5/bc/43b5bce5-570b-785a-689b-93cd9a54dc66/mzaf_15429211941515184697.plus.aac.p.m4a"
  },
  {
    id: "andrea",
    title: "Andrea (feat. Buscabulla)",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "👒",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/05/a6/31/05a631fa-1b1b-34da-8142-d52aeb58eebf/mzaf_13202829663887568334.plus.aac.p.m4a"
  },
  {
    id: "otro-atardecer",
    title: "Otro Atardecer (feat. The Marías)",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🌅",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3e/5f/85/3e5f858c-d5e2-76d2-f093-6e3e738b15af/mzaf_11064066927076408850.plus.aac.p.m4a"
  },
  {
    id: "un-coco",
    title: "Un Coco",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🥥",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/23/fe/3c/23fe3c8e-f711-f1aa-09a7-0ee6d722ce0b/mzaf_12118970714648286716.plus.aac.p.m4a"
  },
  {
    id: "dos-mil-16",
    title: "Dos Mil 16",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "📼",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2c/34/81/2c3481a8-c0a1-ce8f-760c-da9debedc7a2/mzaf_4753365874605227736.plus.aac.p.m4a"
  },
  {
    id: "el-apagon",
    title: "El Apagón",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "⚡",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/88/1a/d2/881ad258-4d49-a5d0-3b35-1b318d527197/mzaf_3975222456564799946.plus.aac.p.m4a"
  },
  {
    id: "aguacero",
    title: "Aguacero",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🌧️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/98/fa/03/98fa0366-fd41-b3ee-2307-c1a5b6f68050/mzaf_4495795716019268936.plus.aac.p.m4a"
  },
  {
    id: "ensename-a-bailar",
    title: "Enséñame a Bailar",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "💃",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d2/5c/bc/d25cbc2c-9333-e77b-116b-97aa3df37dbd/mzaf_17984155223864039749.plus.aac.p.m4a"
  },
  {
    id: "la-corriente",
    title: "La Corriente (feat. Tony Dize)",
    album: "Un Verano Sin Ti",
    year: 2022,
    theme: "uvst",
    emoji: "🌊",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/a2/ee/91/a2ee91d5-21d1-4174-e90c-150baf4e4c51/mzaf_10182620033683004497.plus.aac.p.m4a"
  },
  {
    id: "safaera",
    title: "Safaera (feat. Jowell & Randy)",
    album: "YHLQMDLG",
    year: 2020,
    theme: "yhlqmdlg",
    emoji: "🛹",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/dd/ba/e3/ddbae3c9-29ea-d596-96ba-dd322272c5f6/mzaf_14005940560076990317.plus.aac.p.m4a"
  },
  {
    id: "la-santa",
    title: "La Santa (feat. Daddy Yankee)",
    album: "YHLQMDLG",
    year: 2020,
    theme: "yhlqmdlg",
    emoji: "😇",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ad/6e/c5/ad6ec577-7790-bba5-12cb-5f78c87e07f9/mzaf_4789972617466519274.plus.aac.p.m4a"
  },
  {
    id: "si-veo-a-tu-mama",
    title: "Si Veo a Tu Mamá",
    album: "YHLQMDLG",
    year: 2020,
    theme: "yhlqmdlg",
    emoji: "😭",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b3/cd/a2/b3cda27f-382a-ed21-b6b9-2d6d1d4c5bbe/mzaf_15368178672903748165.plus.aac.p.m4a"
  },
  {
    id: "la-dificil",
    title: "La Difícil",
    album: "Las Que No Iban a Salir",
    year: 2020,
    theme: "lqnias",
    emoji: "👑",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/3d/bb/07/3dbb070e-7def-6973-fb9d-a2ba6e23ade2/mzaf_10872476211479128210.plus.aac.p.m4a"
  },
  {
    id: "yo-perreo-sola",
    title: "Yo Perreo Sola",
    album: "Las Que No Iban a Salir",
    year: 2020,
    theme: "lqnias",
    emoji: "💃",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/dd/45/0c/dd450c77-20ac-97a8-4b6f-189de32647b5/mzaf_3088503985720431976.plus.aac.p.m4a"
  },
  {
    id: "ignorantes",
    title: "Ignorantes (feat. Sech)",
    album: "Las Que No Iban a Salir",
    year: 2020,
    theme: "lqnias",
    emoji: "💔",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e5/cd/6f/e5cd6f7a-846c-791b-6ecc-519f85fa94da/mzaf_1308995959799076230.plus.aac.p.m4a"
  },
  {
    id: "bichiyal",
    title: "Bichiyal (feat. Yaviah)",
    album: "YHLQMDLG",
    year: 2020,
    theme: "yhlqmdlg",
    emoji: "🏍️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/71/f0/fa/71f0faaa-bd26-006b-6060-6f6700bbe0fe/mzaf_1676135694668797571.plus.aac.p.m4a"
  },
  {
    id: "vete",
    title: "Vete",
    album: "Las Que No Iban a Salir",
    year: 2020,
    theme: "lqnias",
    emoji: "🚪",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9e/ed/26/9eed26a0-2242-8bb7-6232-03248ff65f38/mzaf_11531603017291507693.plus.aac.p.m4a"
  },
  {
    id: "25-8",
    title: "25/8",
    album: "Las Que No Iban a Salir",
    year: 2020,
    theme: "lqnias",
    emoji: "⏰",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/9a/36/f2/9a36f259-8848-2071-4c41-4824e67a495b/mzaf_14902156511595530735.plus.aac.p.m4a"
  },
  {
    id: "a-tu-merced",
    title: "A Tu Merced",
    album: "YHLQMDLG",
    year: 2020,
    theme: "yhlqmdlg",
    emoji: "🛏️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/17/ec/ef/17eceff9-59e2-3dbc-2395-eb83903b7d03/mzaf_3226979305489942701.plus.aac.p.m4a"
  },
  {
    id: "solia",
    title: "Soliá",
    album: "YHLQMDLG",
    year: 2020,
    theme: "yhlqmdlg",
    emoji: "💨",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/e9/d8/4b/e9d84bc4-48ab-cd48-4114-f72359e62d68/mzaf_6762542665764117915.plus.aac.p.m4a"
  },
  {
    id: "la-zona",
    title: "La Zona",
    album: "YHLQMDLG",
    year: 2020,
    theme: "yhlqmdlg",
    emoji: "🚧",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ab/72/1a/ab721ae7-6281-e3a7-ea65-bab65a0d20ae/mzaf_4876322880574549450.plus.aac.p.m4a"
  },
  {
    id: "monaco",
    title: "MONACO",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🏎️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/aa/20/e1/aa20e16d-6a31-75d8-f929-b3d15402d014/mzaf_17931258878377910738.plus.aac.p.m4a"
  },
  {
    id: "perro-negro",
    title: "PERRO NEGRO (feat. Feid)",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🐕",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7d/66/2f/7d662f25-7023-0301-f9dc-0e8ce7155a56/mzaf_11838409189562420602.plus.aac.p.m4a"
  },
  {
    id: "fina",
    title: "FINA (feat. Young Miko)",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🤫",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/92/2a/4b/922a4b90-3dde-c8e1-97f9-d610743e58f3/mzaf_2438940676305701570.plus.aac.p.m4a"
  },
  {
    id: "hibiki",
    title: "HIBIKI (feat. Mora)",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🥃",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d4/cf/a4/d4cfa4fb-b94c-7dbc-4141-86710241f0f3/mzaf_14103554806807714088.plus.aac.p.m4a"
  },
  {
    id: "un-preview",
    title: "UN PREVIEW",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🐎",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/75/38/42/753842ef-552a-be59-4e3f-8ade625dc4bd/mzaf_13312280848277164966.plus.aac.p.m4a"
  },
  {
    id: "seda",
    title: "SEDA (feat. Bryant Myers)",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "👔",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/57/8a/17/578a17d4-3ab9-b379-92ec-5fbfb1c9505c/mzaf_4863485028599427699.plus.aac.p.m4a"
  },
  {
    id: "where-she-goes",
    title: "WHERE SHE GOES",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🌌",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ad/82/2d/ad822dea-6b44-13de-2593-7604181fde02/mzaf_13281917994889460607.plus.aac.p.m4a"
  },
  {
    id: "mr-october",
    title: "Mr. October",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "⚾",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ad/68/f3/ad68f34f-897a-0988-0c6f-b6a228e7c46f/mzaf_14312081941548417042.plus.aac.p.m4a"
  },
  {
    id: "cybertruck",
    title: "Cybertruck",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "📐",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/55/21/5a/55215a1f-5347-ac64-1a73-51dd79b27784/mzaf_14136676008117607438.plus.aac.p.m4a"
  },
  {
    id: "vou7y",
    title: "VOU7Y",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "✨",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4f/9a/77/4f9a776b-23ce-877f-03e5-966de543859f/mzaf_11944417217944518372.plus.aac.p.m4a"
  },
  {
    id: "no-me-quiero-casar",
    title: "No Me Quiero Casar",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "💍",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/88/09/c0/8809c0f5-7169-7219-49a6-d30edfeb448e/mzaf_4788092368644578104.plus.aac.p.m4a"
  },
  {
    id: "baticano",
    title: "BATICANO",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🦇",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9f/19/86/9f198699-682b-bf70-c79b-abacec44a41e/mzaf_6458569164932360839.plus.aac.p.m4a"
  },
  {
    id: "gracias-por-nada",
    title: "GRACIAS POR NADA",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🗑️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/2a/cf/532acfbf-bc5d-0cdb-fd0e-21c13e91bb37/mzaf_7342393327582022930.plus.aac.p.m4a"
  },
  {
    id: "dema",
    title: "Dema Ga Ge Gi Go Gu",
    album: "Nadie Sabe Lo Que Va A Pasar Mañana",
    year: 2023,
    theme: "nadiesabe",
    emoji: "🔤",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/a8/32/81/a83281b0-1951-2e69-3c3b-6b6731710821/mzaf_2505887871204591298.plus.aac.p.m4a"
  },
  {
    id: "dakiti",
    title: "Dákiti (feat. Jhayco)",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "🚛",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/91/ab/b9/91abb91c-4e28-b7ae-6b76-b2257b7ee7c4/mzaf_15037794813217074157.plus.aac.p.m4a"
  },
  {
    id: "la-noche-de-anoche",
    title: "La Noche de Anoche (with Rosalía)",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "🌹",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/e1/68/7d/e1687dbd-9fa8-6330-f8bc-9f2d539ab039/mzaf_6426845985048084789.plus.aac.p.m4a"
  },
  {
    id: "booker-t",
    title: "Booker T",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "🏆",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/21/2b/8e/212b8eaf-b99c-e0e7-42e8-27f7fd701514/mzaf_4772784024094951049.plus.aac.p.m4a"
  },
  {
    id: "te-mudaste",
    title: "Te Mudaste",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "📦",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/47/78/81/4778818d-1313-7dc5-3183-f4c1b8745374/mzaf_18130379589461580070.plus.aac.p.m4a"
  },
  {
    id: "yo-visto-asi",
    title: "Yo Visto Así",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "👟",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/23/0e/60/230e6078-0550-7f1d-5b3a-83f9ba9c893c/mzaf_13043718732366245803.plus.aac.p.m4a"
  },
  {
    id: "120",
    title: "120",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "🔥",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2b/17/62/2b1762f2-bd7d-41c0-839c-20c964ff45de/mzaf_1155106365794524557.plus.aac.p.m4a"
  },
  {
    id: "haciendo-que-me-amas",
    title: "Haciendo Que Me Amas",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "🖤",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/db/16/0d/db160de2-ce8c-582c-7f42-3a7bd44afd6d/mzaf_509961440627713465.plus.aac.p.m4a"
  },
  {
    id: "maldita-pobreza",
    title: "Maldita Pobreza",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "💸",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/75/e0/39/75e039d8-f18b-92e2-5f87-fee0494eead8/mzaf_14320473857455168528.plus.aac.p.m4a"
  },
  {
    id: "te-deseo-lo-mejor",
    title: "Te Deseo lo Mejor",
    album: "El Último Tour Del Mundo",
    year: 2020,
    theme: "eutdm",
    emoji: "💌",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview126/v4/62/9c/dd/629cdd0c-8d5c-f152-1df2-3b70219d2751/mzaf_3466764076716966357.plus.aac.p.m4a"
  },
  {
    id: "caro",
    title: "Caro",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "👁️‍🗨️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/48/f3/f9/48f3f913-8611-5dae-b9f7-b7e99e9618d0/mzaf_9554157280783761668.plus.aac.p.m4a"
  },
  {
    id: "ni-bien-ni-mal",
    title: "Ni Bien Ni Mal",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🐩",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/97/a7/dc/97a7dc0b-3412-8bf9-6d3d-affa5cce0ac6/mzaf_14104158146329838429.plus.aac.p.m4a"
  },
  {
    id: "estamos-bien",
    title: "Estamos Bien",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🤙",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/fc/2b/1f/fc2b1f38-b2af-4ba6-e144-26e8442f8586/mzaf_16057425778477285662.plus.aac.p.m4a"
  },
  {
    id: "la-romana",
    title: "La Romana (feat. El Alfa)",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🔥",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/67/68/da/6768da23-2a87-1a61-3e0c-6343bbf7def2/mzaf_12566167496288218150.plus.aac.p.m4a"
  },
  {
    id: "mia",
    title: "MIA (feat. Drake)",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🦉",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/72/ad/b6/72adb69d-18a8-a7cd-4534-bba34deb9486/mzaf_14761776520883767907.plus.aac.p.m4a"
  },
  {
    id: "solo-de-mi",
    title: "Solo de Mí",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🚶",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/cb/79/62/cb7962e3-98a0-ca91-ffc7-3c374a331351/mzaf_18194306686486355534.plus.aac.p.m4a"
  },
  {
    id: "si-estuviesemos-juntos",
    title: "Si Estuviésemos Juntos",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "❄️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/79/54/b9/7954b9c3-9015-47b4-4921-edf5b5da9871/mzaf_1677484927020451272.plus.aac.p.m4a"
  },
  {
    id: "como-antes",
    title: "Como Antes",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🕰️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b5/a5/2f/b5a52fc3-2a27-524a-b269-daf91056ee3a/mzaf_17890468728398963214.plus.aac.p.m4a"
  },
  {
    id: "rlndt",
    title: "RLNDT",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🧩",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c9/27/1b/c9271b94-c0e0-62b1-2db7-334be9fa892c/mzaf_15269687580062839579.plus.aac.p.m4a"
  },
  {
    id: "otra-noche-en-miami",
    title: "Otra Noche en Miami",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🌴",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/a9/bb/1a/a9bb1a7e-9b23-8d9f-9f9e-226b1df72f2a/mzaf_12214025847237217238.plus.aac.p.m4a"
  },
  {
    id: "tu-no-metes-cabra",
    title: "Tú No Metes Cabra",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🐐",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/37/e1/92/37e192be-e833-777b-842a-e183ea5d314a/mzaf_16813614455874496310.plus.aac.p.m4a"
  },
  {
    id: "mayores",
    title: "Mayores (feat. Becky G)",
    album: "X 100PRE",
    year: 2018,
    theme: "x100pre",
    emoji: "🔞",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/2d/c7/0c/2dc70cf6-c9cd-2152-02c1-c9d38060cf56/mzaf_3968478460303781646.plus.aac.p.m4a"
  },
  {
    id: "la-cancion",
    title: "La Canción (with J Balvin)",
    album: "Oasis",
    year: 2019,
    theme: "oasis",
    emoji: "🦎",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/cf/5f/ef/cf5fef49-8ab0-0d0b-f17a-d820cdca1d88/mzaf_3693019759359818051.plus.aac.p.m4a"
  },
  {
    id: "mojaita",
    title: "Mojaita (with J Balvin)",
    album: "Oasis",
    year: 2019,
    theme: "oasis",
    emoji: "🌊",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c2/42/86/c24286a3-9d6c-7056-e1f7-7707138b7538/mzaf_8709536272658992544.plus.aac.p.m4a"
  },
  {
    id: "callaita",
    title: "Callaita",
    album: "Single",
    year: 2019,
    theme: "singles",
    emoji: "🤫",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/93/3e/d7/933ed72c-f24f-ad7a-e91b-8a35ccc75372/mzaf_485263337566130707.plus.aac.p.m4a"
  },
  {
    id: "yonaguni",
    title: "Yonaguni",
    album: "Single",
    year: 2021,
    theme: "singles",
    emoji: "🇯🇵",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/49/b9/6b/49b96b1c-aeee-7e22-ce0a-be17bab4a864/mzaf_5470366028981689473.plus.aac.p.m4a"
  },
  {
    id: "soy-peor",
    title: "Soy Peor",
    album: "Single (Trap Era)",
    year: 2016,
    theme: "singles",
    emoji: "😈",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/c2/d4/0d/c2d40d34-e407-ed99-eb58-0e2b4ecd799a/mzaf_7715703807770741123.plus.aac.p.m4a"
  },
  {
    id: "chambea",
    title: "Chambea",
    album: "Single",
    year: 2017,
    theme: "singles",
    emoji: "🔫",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fa/f1/f8/faf1f890-8c1d-a87b-9e3f-3f7a45235fbd/mzaf_11199641229246548629.plus.aac.p.m4a"
  },
  {
    id: "amorfoda",
    title: "Amorfoda",
    album: "Single",
    year: 2018,
    theme: "singles",
    emoji: "💔",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b3/68/bb/b368bb0f-5f10-f0e8-74b4-58e0a95d77fb/mzaf_14541338477590224542.plus.aac.p.m4a"
  }
,

  {
    id: "sp-mudanza", title: "La Mudanza", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "📦",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0a/97/81/0a9781e6-ed76-0a9c-74c0-9835cbddd543/mzaf_15456814033664478187.plus.aac.p.m4a"
  },
  {
    id: "sp-pitorro", title: "Pitorro de Coco", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🥥",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/44/70/0b/44700b1e-49bb-cf42-556c-9a86a2ad6d69/mzaf_9113194764678012750.plus.aac.p.m4a"
  },
  {
    id: "sp-weltita", title: "Weltita", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🌍",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/fa/38/20/fa382077-6038-507d-d043-054d8b716a2a/mzaf_9850027962155209593.plus.aac.p.m4a"
  },
  {
    id: "sp-turista", title: "Turista", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🧳",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/25/d3/06/25d306b1-5945-28fd-4929-01989d2167e8/mzaf_5509319358451232894.plus.aac.p.m4a"
  },
  {
    id: "sp-baile", title: "Baile Inolvidable", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "💃",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/ea/38/3aea38e3-106b-db96-7beb-5d2bc02bdf70/mzaf_17568275540135957611.plus.aac.p.m4a"
  },
  {
    id: "sp-nuevayol", title: "Nuevayol", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🗽",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/2e/97/55/2e97555a-1ed3-9e07-de57-07e1213186c9/mzaf_7594924455925081680.plus.aac.p.m4a"
  },
  {
    id: "sp-velda", title: "Veldá", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🔥",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/5d/12/88/5d128874-630c-6a49-8338-1b0b5d927e6a/mzaf_5594290469332929228.plus.aac.p.m4a"
  },
  {
    id: "sp-voy", title: "Voy a LLevarte Pa' PR", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🇵🇷",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/04/a3/b6/04a3b623-a232-494a-2edf-80fb0b2eb426/mzaf_4844324965502281486.plus.aac.p.m4a"
  },
  {
    id: "sp-cafe", title: "Café Con Ron", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "☕",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/57/38/8f/57388fad-59e3-e11f-4147-500341594b86/mzaf_6984117293309341445.plus.aac.p.m4a"
  },
  {
    id: "sp-kloufrens", title: "Kloufrens", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🔒",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/15/7f/0e/157f0e07-bf0c-9b20-a280-934068e7e194/mzaf_17726143982854325993.plus.aac.p.m4a"
  },
  {
    id: "sp-dtmf", title: "DTMF", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "📸",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d9/ea/9c/d9ea9c1c-4b31-c448-0882-f9bae822e1fd/mzaf_3206041669449949150.plus.aac.p.m4a"
  },
  {
    id: "sp-eoo", title: "Eoo", album: "DeBÍ TiRAR MáS FOToS", year: 2025, theme: "dtmf", emoji: "🗣️",
    previewUrl: "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/bb/b7/ad/bbb7adc0-e19a-de2c-f5fa-7aa7597c018f/mzaf_3830528517982749933.plus.aac.p.m4a"
  },
  // ── DeBÍ TiRAR MáS FOToS (2025) — NOT in fixed setlist ──
  { id:"perfumito-nuevo",          title:"Perfumito Nuevo",         album:"DeBÍ TiRAR MáS FOToS", year:2025, theme:"dtmf",      emoji:"🌸", previewUrl:null },
  { id:"el-club",                  title:"El Clúb",                 album:"DeBÍ TiRAR MáS FOToS", year:2025, theme:"dtmf",      emoji:"🎪", previewUrl:null },
  { id:"ketu-tecre",               title:"Ketu Tecrè",              album:"DeBÍ TiRAR MáS FOToS", year:2025, theme:"dtmf",      emoji:"🕺", previewUrl:null },
  { id:"lo-que-le-paso-hawaii",    title:"Lo Que Le Pasó a Hawaii", album:"DeBÍ TiRAR MáS FOToS", year:2025, theme:"dtmf",      emoji:"🌺", previewUrl:null },
  // ── Nadie Sabe Lo Que Va A Pasar Mañana (2023) — not performed yet ──
  { id:"telefono-nuevo",           title:"Teléfono Nuevo",          album:"Nadie Sabe",            year:2023, theme:"nadiesabe", emoji:"📱", previewUrl:null },
  { id:"baby-nueva",               title:"Baby Nueva",              album:"Nadie Sabe",            year:2023, theme:"nadiesabe", emoji:"👶", previewUrl:null },
  { id:"mercedes-carota",          title:"Mercedes Carota",         album:"Nadie Sabe",            year:2023, theme:"nadiesabe", emoji:"🚗", previewUrl:null },
  { id:"los-pits",                 title:"Los Pits",                album:"Nadie Sabe",            year:2023, theme:"nadiesabe", emoji:"🏎️", previewUrl:null },
  { id:"vuelve-candy-b",           title:"Vuelve Candy B",          album:"Nadie Sabe",            year:2023, theme:"nadiesabe", emoji:"🍬", previewUrl:null },
  { id:"europa",                   title:"Europa :)",               album:"Nadie Sabe",            year:2023, theme:"nadiesabe", emoji:"🇪🇺", previewUrl:null },
  { id:"acho-pr",                  title:"Acho PR",                 album:"Nadie Sabe",            year:2023, theme:"nadiesabe", emoji:"🇵🇷", previewUrl:null },
  // ── 3MEN2 KBRN (2023) — Coco Chanel: exclusive performance ──
  { id:"coco-chanel",              title:"Coco Chanel (feat. Eladio Carrión)", album:"3MEN2 KBRN", year:2023, theme:"nadiesabe", emoji:"💎", previewUrl:null },
  // ── Un Verano Sin Ti (2022) — not performed yet ──
  { id:"yo-no-soy-celoso",         title:"Yo No Soy Celoso",        album:"Un Verano Sin Ti",      year:2022, theme:"uvst",      emoji:"😌", previewUrl:null },
  { id:"me-fui-de-vacaciones",     title:"Me Fui de Vacaciones",    album:"Un Verano Sin Ti",      year:2022, theme:"uvst",      emoji:"✈️", previewUrl:null },
  { id:"un-verano-sin-ti-title",   title:"Un Verano Sin Ti",        album:"Un Verano Sin Ti",      year:2022, theme:"uvst",      emoji:"🏝️", previewUrl:null },
  { id:"agosto",                   title:"Agosto",                  album:"Un Verano Sin Ti",      year:2022, theme:"uvst",      emoji:"☀️",  previewUrl:null },
  // ── Las Que No Iban a Salir (2020) — missing tracks ──
  { id:"pero-ya-no",               title:"Pero Ya No",              album:"Las Que No Iban a Salir", year:2020, theme:"lqnias", emoji:"🚫",  previewUrl:null },
  { id:"en-casita",                title:"En Casita",               album:"Las Que No Iban a Salir", year:2020, theme:"lqnias", emoji:"🏡",  previewUrl:null },
  { id:"p-fkn-r",                  title:"P FKN R",                 album:"Las Que No Iban a Salir", year:2020, theme:"lqnias", emoji:"🇵🇷",  previewUrl:null },
  { id:"entre-nosotros",           title:"Entre Nosotros (feat. Romeo Santos)", album:"Las Que No Iban a Salir", year:2020, theme:"lqnias", emoji:"🥂", previewUrl:null }
];

// Diccionario de personalidades basado en el álbum
const ALBUM_PERSONALITIES = {
  es: {
    "uvst": "nostálgica, playera, emocional 🌴💔",
    "yhlqmdlg": "rebelde, perreadora, icónica 🛹🔥",
    "x100pre": "profunda, innovadora, sentimental 👁️🖤",
    "nadiesabe": "oscura, directa, sin filtros 🐎🦇",
    "eutdm": "experimental, vanguardista, alternativa 🚛🌍",
    "dtmf": "visionaria, conceptual, fotográfica 🐸📸",
    "singles": "versátil, impredecible, siempre en tendencia 📈✨"
  },
  en: {
    "uvst": "nostalgic, beachy, emotional 🌴💔",
    "yhlqmdlg": "rebellious, iconic, perreo-ready 🛹🔥",
    "x100pre": "deep, innovative, sentimental 👁️🖤",
    "nadiesabe": "dark, direct, unfiltered 🐎🦇",
    "eutdm": "experimental, avant-garde, alternative 🚛🌍",
    "dtmf": "visionary, conceptual, photographic 🐸📸",
    "singles": "versatile, unpredictable, always trending 📈✨"
  }
};

// Estado global del torneo
let tournament = {
  allSongs: [...SONGS_DATABASE], // Copia para añadir personalizadas
  activeSongs: [], // Canciones seleccionadas para este torneo
  roundSongs: [], // Canciones activas en la ronda actual
  winnersOfRound: [], // Ganadores de los enfrentamientos de la ronda actual
  currentMatchIndex: 0, // Índice del enfrentamiento actual
  roundNumber: 1, // Número de ronda
  totalRounds: 0, // Total de rondas (log2(N))
  history: [], // Historial de enfrentamientos para renderizar el bracket
  size: 16, // Tamaño por defecto (8, 16, 32)
  mode: "tournament", // "tournament"
  ranking: [], // Para guardar el Top 8 final
  customSongsCount: 0
};

// Estado Analítica
let analyticsTournamentId = null;
let analyticsTournamentStartMs = 0;
let analyticsMatchStartMs = 0;

// Configuración de temas visuales por Era
const THEME_STYLES = {
  dtmf: {
    background: "linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)",
    accentColor: "#ffd700",
    glow: "rgba(255, 215, 0, 0.4)",
    albumTitle: "DeBÍ TiRAR MáS FOToS (2025)",
    color1: "#1f1c2c",
    color2: "#928dab"
  },
  uvst: {
    background: "linear-gradient(135deg, #ff5e62 0%, #ff9966 100%)",
    accentColor: "#ff5e62",
    glow: "rgba(255, 94, 98, 0.4)",
    albumTitle: "Un Verano Sin Ti (2022)"
  },
  yhlqmdlg: {
    background: "linear-gradient(135deg, #a800ff 0%, #00ffff 100%)",
    accentColor: "#a800ff",
    glow: "rgba(168, 0, 255, 0.4)",
    albumTitle: "YHLQMDLG (2020)"
  },
  nadiesabe: {
    background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    accentColor: "#2c5364",
    glow: "rgba(44, 83, 100, 0.4)",
    albumTitle: "Nadie Sabe Lo Que Va A Pasar Mañana (2023)"
  },
  eutdm: {
    background: "linear-gradient(135deg, #111111 0%, #333333 50%, #e5c158 100%)",
    accentColor: "#e5c158",
    glow: "rgba(229, 193, 88, 0.4)",
    albumTitle: "El Último Tour del Mundo (2020)"
  },
  x100pre: {
    background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
    accentColor: "#fbc2eb",
    glow: "rgba(251, 194, 235, 0.4)",
    albumTitle: "X 100PRE (2018)"
  },
  oasis: {
    background: "linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)",
    accentColor: "#3a7bd5",
    glow: "rgba(58, 123, 213, 0.4)",
    albumTitle: "Oasis (2019)"
  },
  singles: {
    background: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
    accentColor: "#4e4376",
    glow: "rgba(78, 67, 118, 0.4)",
    albumTitle: "Single / Colaboración"
  },
  custom: {
    background: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    accentColor: "#f5af19",
    glow: "rgba(245, 175, 25, 0.4)",
    albumTitle: "Canción Personalizada"
  }
};

// Inicialización de la aplicación al cargar
document.addEventListener("DOMContentLoaded", () => {
  setupEventListeners();
  renderConfigScreen();
  
});

// Registrar eventos
function setupEventListeners() {
  const btnModeClassic = document.getElementById("btn-mode-classic");
  const btnModeSurvivor = document.getElementById("btn-mode-survivor");
  
  if (btnModeClassic) {
    btnModeClassic.addEventListener("click", () => {
      gameMode = 'classic';
      if (typeof trackEvent === 'function') trackEvent('mode_selected', 'classic');
      document.getElementById("mode-selection-screen").classList.add("hidden");
      document.getElementById("config-screen").classList.remove("hidden");
      renderConfigScreen();
    });
  }
  
  if (btnModeSurvivor) {
    btnModeSurvivor.addEventListener("click", () => {
      if (typeof trackEvent === 'function') trackEvent('mode_selected', 'survivor');
      startSurvivorMode();
    });
  }
  
  const btnModeQuiz = document.getElementById("btn-mode-quiz");
  if (btnModeQuiz) {
    btnModeQuiz.addEventListener("click", () => {
      if (typeof trackEvent === 'function') trackEvent('mode_selected', 'quiz');
      startQuizMode();
    });
  }
  
  const btnModeStats = document.getElementById("btn-mode-stats");
  if (btnModeStats) {
    btnModeStats.addEventListener("click", showGlobalStats);
  }
  const btnModeTracker = document.getElementById("btn-mode-tracker");
  if (btnModeTracker) {
    btnModeTracker.addEventListener("click", showTourTracker);
  }
  document.querySelectorAll(".btn-size").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".btn-size").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      tournament.size = parseInt(btn.dataset.size);
      
      const warningEl = document.getElementById("size-warning");
      if (warningEl) {
        warningEl.textContent = tournament.size === 64 
          ? (currentLang === 'en' ? "(WARNING: This is a review of almost all songs!)" : "(OJO, ¡esto es un repaso de todas las canciones!)")
          : "";
      }
      
      validateAlbumSelection();
    });
  });

  // Checkbox de Álbumes
  document.querySelectorAll(".album-checkbox").forEach(cb => {
    cb.addEventListener("change", () => {
      validateAlbumSelection();
    });
  });

  // Botón iniciar torneo
  document.getElementById("btn-start").addEventListener("click", () => {
    startTournament();
  });



  // Botones de votar canciones
  document.getElementById("card-left").addEventListener("click", () => vote(0));
  document.getElementById("card-right").addEventListener("click", () => vote(1));

  // Botones de preview de audio 🎧 (stop propagation para que no dispare el voto)
  document.getElementById("btn-preview-left").addEventListener("click", (e) => {
    e.stopPropagation();
    const songId = document.getElementById("card-left").dataset.previewSongId;
    if (songId) togglePreview(songId, document.getElementById("card-left"));
  });
  document.getElementById("btn-preview-right").addEventListener("click", (e) => {
    e.stopPropagation();
    const songId = document.getElementById("card-right").dataset.previewSongId;
    if (songId) togglePreview(songId, document.getElementById("card-right"));
  });

  // Botón reiniciar
  document.querySelectorAll(".btn-restart").forEach(btn => {
    btn.addEventListener("click", () => {
      resetTournament();
    });
  });

  // Teclas rápidas (Flecha izquierda / derecha o A / D)
  document.addEventListener("keydown", (e) => {
    const arena = document.getElementById("arena-screen");
    if (arena && !arena.classList.contains("hidden")) {
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        vote(0);
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        vote(1);
      }
    }
  });

  // Gestos de Swipe en móvil
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});
  
  document.addEventListener("touchend", (e) => {
    const arena = document.getElementById("arena-screen");
    if (!arena || arena.classList.contains("hidden")) return; 
    
    // Asegurarse de que no estamos en el modo bracket donde el usuario intenta hacer scroll
    const bracketView = document.getElementById("bracket-view-content");
    if (bracketView && !bracketView.classList.contains("hidden")) return;

    touchEndX = e.changedTouches[0].screenX;
    
    // Si la distancia es mayor a 50px
    if (touchEndX < touchStartX - 50) {
      // Swipe Izquierda <- (Elige la canción de la Izquierda)
      vote(0);
    } else if (touchEndX > touchStartX + 50) {
      // Swipe Derecha -> (Elige la canción de la Derecha)
      vote(1);
    }
  }, {passive: true});
}

// Validar selección de álbumes y actualizar estimación de canciones
function validateAlbumSelection() {
  const selectedAlbums = Array.from(document.querySelectorAll(".album-checkbox:checked")).map(cb => cb.value);
  
  // Filtrar base de datos (y excluir las 3 canciones reservadas para Survivor/Quiz)
  const pool = tournament.allSongs.filter(s => 
    selectedAlbums.includes(s.theme)
  );
  
  const poolCountEl = document.getElementById("pool-count");
  poolCountEl.innerHTML = TRANSLATIONS[currentLang].pool_count.replace('{count}', pool.length);

  const btnStart = document.getElementById("btn-start");
  const errorMsg = document.getElementById("config-error");

  if (pool.length < tournament.size) {
    errorMsg.innerHTML = TRANSLATIONS[currentLang].pool_error
      .replace('{size}', tournament.size)
      .replace('{count}', pool.length);
    errorMsg.classList.remove("hidden");
    btnStart.disabled = true;
  } else {
    errorMsg.classList.add("hidden");
    btnStart.disabled = false;
  }
}

// Renderizar pantalla de configuración
function renderConfigScreen() {
  validateAlbumSelection();
}



// Iniciar torneo
function startTournament() {
  const selectedAlbums = Array.from(document.querySelectorAll(".album-checkbox:checked")).map(cb => cb.value);
  let pool = tournament.allSongs.filter(s => 
    selectedAlbums.includes(s.theme)
  );

  // Desbloquear reproductor global de audio para móviles (requiere interacción directa del usuario)
  if (!window.globalAudioPlayer) {
    window.globalAudioPlayer = new Audio();
  }
  // Añadimos un mp3 silencioso en base64 para que el play() no lance error y se desbloquee el contexto de audio
  window.globalAudioPlayer.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC0gUm95YWx0eSBGcmVlIFNvdW5kc///wQAAP8AAAAA//8GAAAP//AAAP/wAAAAAP/wAA";
  window.globalAudioPlayer.play().then(() => {
    window.globalAudioPlayer.pause();
  }).catch(e => { console.log("Unlock failed", e) });

  // Barajar canciones (Fisher-Yates shuffle)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Seleccionar tamaño del torneo
  tournament.activeSongs = pool.slice(0, tournament.size);
  tournament.roundSongs = [...tournament.activeSongs];
  tournament.winnersOfRound = [];
  tournament.currentMatchIndex = 0;
  tournament.roundNumber = 1;
  tournament.totalRounds = Math.log2(tournament.size);
  tournament.history = [];
  tournament.ranking = [];

  // Analytics
  if (typeof generateUUID === 'function') {
    analyticsTournamentId = generateUUID();
    analyticsTournamentStartMs = Date.now();
    trackEvent('tournament_started', gameMode, { size: tournament.size, eras: selectedAlbums });
  }

  // Ocultar inicio, mostrar batalla
  document.getElementById("config-screen").classList.add("hidden");
  document.getElementById("arena-screen").classList.remove("hidden");
  const nb = document.getElementById("nav-bracket"); nb.classList.remove("hidden"); nb.style.display = 'flex';

  // Iniciar la ronda
  updateRoundHeader();
  renderMatch();
  renderBracketStructure();
}

// Actualizar cabecera de la ronda
function updateRoundHeader() {
  const totalMatches = tournament.roundSongs.length / 2;
  const currentMatch = tournament.currentMatchIndex + 1;

  document.getElementById("round-title").textContent = getRoundName(tournament.roundSongs.length);
  document.getElementById("match-progress").innerHTML = TRANSLATIONS[currentLang].match_progress
    .replace('{current}', currentMatch)
    .replace('{total}', totalMatches);
  
  // Barra de progreso
  const percent = ((currentMatch - 1) / totalMatches) * 100;
  document.getElementById("progress-bar-fill").style.width = `${percent}%`;
}

// Obtener nombre legible de la ronda
function getRoundName(songsCount) {
  if (songsCount === 64) return TRANSLATIONS[currentLang].round_64;
  if (songsCount === 32) return TRANSLATIONS[currentLang].round_32;
  if (songsCount === 16) return TRANSLATIONS[currentLang].round_16;
  if (songsCount === 8) return TRANSLATIONS[currentLang].round_8;
  if (songsCount === 4) return TRANSLATIONS[currentLang].round_4;
  if (songsCount === 2) return TRANSLATIONS[currentLang].round_2;
  return TRANSLATIONS[currentLang].round_default;
}

// Renderizar el enfrentamiento 1v1
function renderMatch() {
  const songA = tournament.roundSongs[tournament.currentMatchIndex * 2];
  const songB = tournament.roundSongs[tournament.currentMatchIndex * 2 + 1];

  if (!songA || !songB) return;

  // Parar cualquier audio que estuviera sonando del enfrentamiento anterior
  stopPreview();

  analyticsMatchStartMs = Date.now();

  const cardLeft = document.getElementById("card-left");
  const cardRight = document.getElementById("card-right");

  // Resetear animaciones
  cardLeft.className = "song-card-wrapper transition-all duration-300";
  cardRight.className = "song-card-wrapper transition-all duration-300";

  // Esperar a que se aplique la clase para dar efecto de carga
  setTimeout(() => {
    // Aplicar estilos temáticos de la era de Bad Bunny
    applyThemeToCard(cardLeft, songA);
    applyThemeToCard(cardRight, songB);

    // Contenido
    document.getElementById("left-emoji").textContent = songA.emoji;
    document.getElementById("left-title").textContent = songA.title;
    document.getElementById("left-album").textContent = songA.album;
    document.getElementById("left-year").textContent = songA.year;

    document.getElementById("right-emoji").textContent = songB.emoji;
    document.getElementById("right-title").textContent = songB.title;
    document.getElementById("right-album").textContent = songB.album;
    document.getElementById("right-year").textContent = songB.year;

    // Guardar referencia al ID de canción en el dataset de cada tarjeta para el botón 🎧
    document.getElementById("card-left").dataset.previewSongId = songA.id;
    document.getElementById("card-right").dataset.previewSongId = songB.id;

    // Pre-fetch preview URLs en segundo plano para ambas canciones
    fetchPreviewUrl(songA.id);
    fetchPreviewUrl(songB.id);
  }, 50);
}

// Aplicar estilos CSS basados en el tema del álbum
function applyThemeToCard(cardElement, song) {
  const theme = THEME_STYLES[song.theme] || THEME_STYLES.singles;
  
  // Cambiar el gradiente de fondo, color de resplandor y bordes
  cardElement.style.background = theme.background;
  cardElement.style.boxShadow = `0 10px 30px -10px ${theme.glow}`;
  cardElement.style.borderColor = theme.accentColor;
  
  // Añadir una clase de era por si acaso
  cardElement.classList.add(`theme-${song.theme}`);
}

// Votar por una canción (index: 0 = Izquierda, 1 = Derecha)
function vote(chosenIndex) {
  if (gameMode === 'survivor') {
    const winnerId = chosenIndex === 0 ? survivorState.reigningChamp.id : survivorState.challenger.id;
    handleSurvivorVote(winnerId);
    return;
  }
  // Parar cualquier audio preview INMEDIATAMENTE al votar para evitar solapamientos
  stopPreview(true);
  const songA = tournament.roundSongs[tournament.currentMatchIndex * 2];
  const songB = tournament.roundSongs[tournament.currentMatchIndex * 2 + 1];
  
  const chosen = chosenIndex === 0 ? songA : songB;
  const loser = chosenIndex === 0 ? songB : songA;

  // Analytics
  const responseTime = Date.now() - analyticsMatchStartMs;
  if (typeof trackDuelVote === 'function') {
    trackDuelVote(gameMode, analyticsTournamentId, tournament.roundNumber, songA.id, songB.id, chosen.id, loser.id, chosenIndex === 0 ? 'left' : 'right', responseTime);
  }

  // Registrar en historial para el bracket
  tournament.history.push({
    round: tournament.roundNumber,
    songA: songA,
    songB: songB,
    winner: chosen,
    matchId: `${tournament.roundNumber}-${tournament.currentMatchIndex}`
  });

  // Guardar ganador para la siguiente ronda
  tournament.winnersOfRound.push(chosen);

  // Guardar en el ranking inverso de eliminados si es necesario
  // En cuartos de final (8 canciones): las 4 que pierden quedan en puestos 5-8
  // En semifinales (4 canciones): las 2 que pierden quedan en puestos 3-4
  // En la final (2 canciones): la que pierde queda 2da, ganadora 1era.
  if (tournament.roundSongs.length <= 8) {
    tournament.ranking.push({
      song: loser,
      roundEliminated: tournament.roundNumber
    });
  }

  // Animación visual de voto
  const chosenCard = chosenIndex === 0 ? document.getElementById("card-left") : document.getElementById("card-right");
  const loserCard = chosenIndex === 0 ? document.getElementById("card-right") : document.getElementById("card-left");

  chosenCard.classList.add("card-voted-winner");
  loserCard.classList.add("card-voted-loser");

  // Esperar animación y avanzar
  setTimeout(() => {
    tournament.currentMatchIndex++;

    const totalMatches = tournament.roundSongs.length / 2;
    if (tournament.currentMatchIndex >= totalMatches) {
      // Fin de la ronda
      advanceRound();
    } else {
      // Siguiente enfrentamiento
      updateRoundHeader();
      renderMatch();
    }
    // Actualizar visualizador del bracket en vivo
    updateLiveBracket();
  }, 450);
}

// Avanzar de ronda
function advanceRound() {
  if (tournament.winnersOfRound.length === 1) {
    // ¡TENEMOS CAMPEÓN!
    const champion = tournament.winnersOfRound[0];
    tournament.ranking.push({
      song: champion,
      roundEliminated: tournament.roundNumber + 1
    });
    showWinnerScreen(champion);
  } else {
    // Avanzar a la siguiente ronda
    tournament.roundSongs = [...tournament.winnersOfRound];
    tournament.winnersOfRound = [];
    tournament.currentMatchIndex = 0;
    tournament.roundNumber++;

    updateRoundHeader();
    renderMatch();
  }
}

function injectShareWinner(winner) {
  const personalityEl = document.getElementById("winner-personality");
  const btnShare = document.getElementById("btn-share-tournament");
  
  let displayText = "";
  let shareText = "";

  if (gameMode === 'survivor') {
    const pos = SPECIAL_TOUR_IDS.indexOf(winner.id) + 1;
    if (pos > 0) {
      displayText = TRANSLATIONS[currentLang].share_survivor_hint.replace('{pos}', pos);
      shareText = TRANSLATIONS[currentLang].share_survivor_text.replace('{title}', winner.title).replace('{pos}', pos);
    } else {
      displayText = TRANSLATIONS[currentLang].share_survivor_exclusive_hint;
      shareText = TRANSLATIONS[currentLang].share_survivor_exclusive_text.replace('{title}', winner.title);
    }
  } else {
    // Modo Torneo Clásico
    const personalityText = ALBUM_PERSONALITIES[currentLang][winner.theme] || ALBUM_PERSONALITIES[currentLang]["singles"];
    // Hardcoding display text format for simplicity but translating personality
    displayText = currentLang === 'en' ? `You are from the <strong>${winner.album}</strong> era: ${personalityText}` : `Eres de la era <strong>${winner.album}</strong>: ${personalityText}`;
    shareText = TRANSLATIONS[currentLang].share_classic_text.replace('{title}', winner.title).replace('{album}', winner.album).replace('{personality}', personalityText);
  }

  if (personalityEl) personalityEl.innerHTML = displayText;

  if (btnShare) {
    // Customize button text based on mode
    btnShare.innerHTML = gameMode === 'survivor' 
      ? `<span class="text-xl">📲</span> <span data-i18n="btn_share_setlist">${TRANSLATIONS[currentLang].btn_share_setlist}</span>` 
      : `<span class="text-xl">📲</span> <span data-i18n="btn_share_winner">${TRANSLATIONS[currentLang].btn_share_winner}</span>`;

    btnShare.onclick = async () => {
      const shareData = {
        title: 'Bad Bunny Tournament',
        text: `${shareText}\n\nhttps://copaconejo.vercel.app`
      };
      
      try {
        if (navigator.share) {
          // Omitimos la propiedad "url" porque en iOS WhatsApp a veces ignora el "text" si hay una "url"
          await navigator.share({ title: shareData.title, text: shareData.text });
        } else {
          throw new Error("No share API");
        }
      } catch (err) {
        console.log('Error sharing:', err);
        // Fallback si falla la API nativa
        try {
          await navigator.clipboard.writeText(shareData.text);
          alert(currentLang === 'en' ? "Link and result copied to clipboard! Ready to share." : "¡Enlace y resultado copiados al portapapeles! Listo para compartir.");
        } catch(clipboardErr) {
          alert(`Tu resultado: ${shareData.text}`);
        }
      }
    };
  }
}

// Mostrar pantalla de ganador final
function showWinnerScreen(champion) {
  document.getElementById("arena-screen").classList.add("hidden");
  document.getElementById("winner-screen").classList.remove("hidden");

  // Confeti
  launchConfetti();

  // Mostrar campeón
  const theme = THEME_STYLES[champion.theme] || THEME_STYLES.singles;
  const banner = document.getElementById("winner-banner");
  banner.style.background = theme.background;
  banner.style.boxShadow = `0 20px 50px ${theme.glow}`;
  banner.style.borderColor = theme.accentColor;

  document.getElementById("winner-emoji").textContent = champion.emoji;
  document.getElementById("winner-title").textContent = champion.title;
  document.getElementById("winner-album").textContent = champion.album;
  document.getElementById("winner-year").textContent = champion.year;

  injectShareWinner(champion);
  
  // Supabase Analytics
  const topSongs = [...tournament.ranking].reverse().slice(0, 8).map(r => r.song.id);
  const runnerUpId = tournament.ranking.length > 0 ? tournament.ranking[0].song.id : null;
  if (typeof trackTournamentResult === 'function') {
    const duration = Date.now() - analyticsTournamentStartMs;
    const size = tournament.size;
    const eras = Array.from(document.querySelectorAll(".album-checkbox:checked")).map(cb => cb.value);
    const totalDuels = tournament.history.length;
    trackTournamentResult(gameMode, size, eras, champion.id, runnerUpId, topSongs, totalDuels, duration, false);
    trackEvent('tournament_completed', gameMode);
  }

  // Renderizar Top 8 final
  renderRankingList();
  
  // Copiar el bracket finalizado para poder visualizarlo
  const mainBracket = document.getElementById("bracket-container").innerHTML;
  const winnerBracketContainer = document.getElementById("winner-bracket-container");
  if (winnerBracketContainer) {
    winnerBracketContainer.innerHTML = mainBracket;
    // Esconder el wrapper por defecto cada vez que se carga un nuevo ganador
    const wrapper = document.getElementById("winner-bracket-wrapper");
    if (wrapper) wrapper.classList.add("hidden");
  }
}

// Renderizar el ranking final (Top 8 / 4 / 2 dependiendo del tamaño del torneo)
function renderRankingList() {
  const rankingList = document.getElementById("ranking-list");
  rankingList.innerHTML = "";

  // Ordenar el ranking. El orden de eliminación es:
  // Primeros eliminados en cuartos (puestos 5-8)
  // Luego eliminados en semis (puestos 3-4)
  // Luego perdedor final (puesto 2)
  // Por último, campeón (puesto 1)
  // El array `tournament.ranking` contiene los elementos en orden de eliminación.
  // Es decir: [Loser_1_Cuartos, Loser_2_Cuartos, ..., Loser_1_Semis, Loser_Final, Campeon]
  // Invertimos para que el campeón quede al inicio.
  const sortedRanking = [...tournament.ranking].reverse();
  const top3 = sortedRanking.slice(0, 3);
  const medals = ['👑', '🥈', '🥉'];
  const posClasses = [
    'border-yellow-400 border-opacity-40 text-yellow-300 font-bold',
    'border-gray-300 border-opacity-20 text-gray-200 font-semibold',
    'border-yellow-700 border-opacity-20 text-yellow-600'
  ];
  const bgClasses = [
    'bg-yellow-400 bg-opacity-15',
    'bg-gray-300 bg-opacity-10',
    'bg-yellow-700 bg-opacity-10'
  ];

  top3.forEach((rank, index) => {
    const song = rank.song;
    const item = document.createElement("div");
    const isChamp = index === 0;
    item.className = `flex items-center gap-3 p-3 rounded-lg border ${posClasses[index]} ${bgClasses[index]} transition-all duration-200`;
    item.style.fontSize = isChamp ? '1rem' : '0.9rem';
    item.innerHTML = `
      <span style="font-size:${isChamp ? '2rem' : '1.4rem'}; width:36px; text-align:center;">${medals[index]}</span>
      <span style="font-size:1.3rem;">${song.emoji}</span>
      <div style="flex:1;">
        <p style="font-weight:700; color:white;">${song.title}</p>
        <p style="font-size:0.7rem; color:#9ca3af;">${song.album} (${song.year})</p>
      </div>
    `;
    rankingList.appendChild(item);
  });

  // Rest collapsed
  if (sortedRanking.length > 3) {
    const rest = document.createElement('details');
    rest.className = 'mt-2';
    rest.innerHTML = `<summary style="cursor:pointer; color:#6b7280; font-size:0.75rem; text-align:center; padding:4px;">Ver resto (${sortedRanking.length - 3} más)</summary>`;
    sortedRanking.slice(3).forEach((rank, i) => {
      const d = document.createElement('div');
      d.className = 'flex items-center gap-2 p-2 rounded mt-1 bg-white bg-opacity-5';
      d.innerHTML = `<span style="width:20px; text-align:center; opacity:0.5; font-size:0.8rem;">${i+4}</span><span>${rank.song.emoji}</span><span style="font-size:0.85rem; color:#d1d5db;">${rank.song.title}</span>`;
      rest.appendChild(d);
    });
    rankingList.appendChild(rest);
  }
}

// Renderizar la estructura vacía del Bracket interactivo
function renderBracketStructure() {
  const container = document.getElementById("bracket-container");
  container.innerHTML = "";

  // Crear columnas para cada ronda
  // Si N = 16:
  // Ronda 1: 16 canciones (8 enfrentamientos)
  // Ronda 2 (Cuartos): 8 canciones (4 enfrentamientos)
  // Ronda 3 (Semis): 4 canciones (2 enfrentamientos)
  // Ronda 4 (Final): 2 canciones (1 enfrentamiento)
  // Ronda 5 (Campeón): 1 canción

  const roundsCount = tournament.totalRounds + 1; // +1 para el campeón final
  
  for (let r = 1; r <= roundsCount; r++) {
    const roundCol = document.createElement("div");
    roundCol.className = `bracket-column round-${r}`;
    
    // Título de la ronda en la cabecera
    const header = document.createElement("div");
    header.className = "bracket-round-header text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-4";
    
    let roundTitle = "";
    const songsInRound = tournament.size / Math.pow(2, r - 1);
    
    if (r === roundsCount) {
      roundTitle = "Campeón";
    } else {
      roundTitle = getRoundName(songsInRound).replace("🔥", "").trim();
    }
    header.textContent = roundTitle;
    roundCol.appendChild(header);

    // Contenedor de matchups de la ronda
    const matchupsContainer = document.createElement("div");
    matchupsContainer.className = "bracket-matchups-container flex flex-col justify-around h-full gap-4";

    if (r === roundsCount) {
      // Campeón final
      const championBox = document.createElement("div");
      championBox.id = "bracket-champion-box";
      championBox.className = "bracket-song-card empty flex items-center justify-center border border-dashed border-opacity-20 border-white rounded-lg p-3 text-sm text-gray-500";
      championBox.innerHTML = `👑 Esperando...`;
      matchupsContainer.appendChild(championBox);
    } else {
      // Generar cajitas vacías para los enfrentamientos de esta ronda
      const matchesInRound = songsInRound / 2;
      for (let m = 0; m < matchesInRound; m++) {
        const matchDiv = document.createElement("div");
        matchDiv.className = "bracket-matchup-pair flex flex-col gap-1 border border-white border-opacity-5 p-2 rounded-lg bg-black bg-opacity-30";
        matchDiv.id = `bmatch-${r}-${m}`;

        // Ranura para Canción A
        const slotA = document.createElement("div");
        slotA.className = "bracket-song-card slot-a flex justify-between items-center text-xs p-2 rounded bg-white bg-opacity-5 text-gray-400";
        slotA.innerHTML = `<span>Song A</span>`;
        slotA.id = `bslot-${r}-${m}-a`;

        // Ranura para Canción B
        const slotB = document.createElement("div");
        slotB.className = "bracket-song-card slot-b flex justify-between items-center text-xs p-2 rounded bg-white bg-opacity-5 text-gray-400";
        slotB.innerHTML = `<span>Song B</span>`;
        slotB.id = `bslot-${r}-${m}-b`;

        matchDiv.appendChild(slotA);
        matchDiv.appendChild(slotB);
        matchupsContainer.appendChild(matchDiv);
      }
    }
    
    roundCol.appendChild(matchupsContainer);
    container.appendChild(roundCol);
  }

  // Poblar la Ronda 1 inicialmente
  for (let m = 0; m < tournament.size / 2; m++) {
    const songA = tournament.activeSongs[m * 2];
    const songB = tournament.activeSongs[m * 2 + 1];

    updateBracketSlot(1, m, "a", songA);
    updateBracketSlot(1, m, "b", songB);
  }
}

// Rellenar una ranura del bracket
function updateBracketSlot(round, matchIndex, slotType, song, isWinner = false) {
  const slot = document.getElementById(`bslot-${round}-${matchIndex}-${slotType}`);
  if (!slot) return;

  if (song) {
    const theme = THEME_STYLES[song.theme] || THEME_STYLES.singles;
    slot.className = `bracket-song-card slot-${slotType} flex justify-between items-center text-xs p-2 rounded text-white transition-all duration-300`;
    slot.style.borderLeft = `3px solid ${theme.accentColor}`;
    slot.style.background = `rgba(255, 255, 255, 0.04)`;
    
    if (isWinner) {
      slot.classList.add("bracket-slot-winner");
      slot.style.background = `rgba(255, 255, 255, 0.1)`;
    }
    
    slot.innerHTML = `
      <span class="truncate font-medium">${song.emoji} ${song.title} <span class="text-gray-400 opacity-70 font-normal">(${song.year})</span></span>
    `;
  } else {
    slot.className = `bracket-song-card slot-${slotType} flex justify-between items-center text-xs p-2 rounded bg-white bg-opacity-5 text-gray-500`;
    slot.style.borderLeft = "none";
    slot.innerHTML = `<span>Esperando...</span>`;
  }
}

// Actualizar el bracket interactivo en tiempo real al votar
function updateLiveBracket() {
  // Recorrer el historial y rellenar las siguientes rondas en el bracket
  // Cada elemento en history es: { round, songA, songB, winner, matchId }
  tournament.history.forEach((match, index) => {
    const r = match.round;
    const mIdx = parseInt(match.matchId.split("-")[1]);

    // Marcar al ganador en su enfrentamiento actual
    const isSongAWinner = match.winner.id === match.songA.id;
    updateBracketSlot(r, mIdx, "a", match.songA, isSongAWinner);
    updateBracketSlot(r, mIdx, "b", match.songB, !isSongAWinner);

    // Colocar al ganador en la siguiente ronda
    const nextRound = r + 1;
    const nextMatchIdx = Math.floor(mIdx / 2);
    const nextSlotType = mIdx % 2 === 0 ? "a" : "b";

    // Si es la ronda final, el ganador va a la caja del campeón
    if (nextRound === tournament.totalRounds + 1) {
      const champBox = document.getElementById("bracket-champion-box");
      if (champBox) {
        const theme = THEME_STYLES[match.winner.theme] || THEME_STYLES.singles;
        champBox.className = "bracket-song-card flex items-center justify-center border rounded-lg p-3 text-sm text-white font-bold transition-all duration-500 scale-105";
        champBox.style.background = theme.background;
        champBox.style.borderColor = theme.accentColor;
        champBox.style.boxShadow = `0 10px 20px ${theme.glow}`;
        champBox.innerHTML = `👑 ${match.winner.emoji} ${match.winner.title}`;
      }
    } else {
      updateBracketSlot(nextRound, nextMatchIdx, nextSlotType, match.winner);
    }
  });
}

// Lanzar confeti (simulación visual HTML5/CSS)
function launchConfetti() {
  const container = document.getElementById("confetti-container");
  container.innerHTML = "";

  const colors = ["#ff5e62", "#ff9966", "#a800ff", "#00ffff", "#e5c158", "#3a7bd5", "#27ae60", "#e74c3c"];
  const shapes = ["circle", "square", "triangle"];

  for (let i = 0; i < 150; i++) {
    const confetti = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    
    confetti.className = `confetti-piece ${shape}`;
    confetti.style.backgroundColor = color;
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = `-${Math.random() * 20}px`;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Tamaños y tiempos aleatorios
    const size = Math.random() * 12 + 6;
    confetti.style.width = `${size}px`;
    confetti.style.height = `${size}px`;
    
    const duration = Math.random() * 3 + 2;
    confetti.style.animationDuration = `${duration}s`;
    
    const delay = Math.random() * 2;
    confetti.style.animationDelay = `${delay}s`;

    container.appendChild(confetti);
  }
}

// Resetear e iniciar de nuevo
function resetTournament() {
  document.getElementById("winner-screen").classList.add("hidden");
  document.getElementById("arena-screen").classList.add("hidden");
  const nb2 = document.getElementById("nav-bracket"); nb2.classList.add("hidden"); nb2.style.display = 'none';
  
  const quizScreen = document.getElementById("quiz-screen");
  if (quizScreen) quizScreen.classList.add("hidden");
  const quizWinnerScreen = document.getElementById("quiz-winner-screen");
  if (quizWinnerScreen) quizWinnerScreen.classList.add("hidden");
  
  document.getElementById("mode-selection-screen").classList.remove("hidden");

  // Limpiar contenedores
  document.getElementById("bracket-container").innerHTML = "";
  document.getElementById("confetti-container").innerHTML = "";
  
  // Restaurar UI del torneo clásico que el Survivor mode modifica
  document.getElementById("tab-bracket-btn").innerHTML = "📊 Cuadro (Bracket)";
  document.getElementById("bracket-container").classList.remove("hidden");
  const survivorLeaderboard = document.getElementById("survivor-leaderboard");
  if (survivorLeaderboard) survivorLeaderboard.classList.add("hidden");
  document.querySelector(".progress-bar-container").classList.remove("hidden");
  document.getElementById("match-progress").classList.remove("hidden");
  
  // Forzar la pestaña de Arena
  if (typeof window.switchTab === "function") window.switchTab("arena");

  // Resetear estados temporales
  tournament.activeSongs = [];
  tournament.roundSongs = [];
  tournament.winnersOfRound = [];
  tournament.currentMatchIndex = 0;
  tournament.roundNumber = 1;
  tournament.history = [];
  tournament.ranking = [];

  renderConfigScreen();
}

// Cambiar pestañas (Sección del bracket / Arena de batalla)
window.switchTab = function(tabName) {
  const arenaTabBtn = document.getElementById("tab-arena-btn");
  const bracketTabBtn = document.getElementById("tab-bracket-btn");
  const arenaScreen = document.getElementById("battle-arena-content");
  const bracketScreen = document.getElementById("bracket-view-content");

  if (tabName === "arena") {
    arenaTabBtn.classList.add("active");
    bracketTabBtn.classList.remove("active");
    arenaScreen.classList.remove("hidden");
    bracketScreen.classList.add("hidden");
  } else if (tabName === "bracket") {
    bracketTabBtn.classList.add("active");
    arenaTabBtn.classList.remove("active");
    bracketScreen.classList.remove("hidden");
    arenaScreen.classList.add("hidden");
  }
};

// =====================================================================
// SISTEMA DE AUDIO PREVIEW (iTunes 30-second previews)
// =====================================================================

// Caché de URLs de preview: { songId: "https://...m4a" | null }
const previewCache = {};

// Objeto Audio global reutilizable
let previewAudio = null;
let currentPreviewSongId = null;
let fadeInterval = null;

// Volumen máximo del preview (0.0 - 1.0)
const PREVIEW_MAX_VOLUME = 0.45;
// Duración del fade en ms
const FADE_DURATION = 350;
// Duración del snippet antes de auto-stop (ms)
const SNIPPET_DURATION = 30000;

// Timer para auto-stop del snippet
let snippetTimer = null;
// Tarjeta que está reproduciendo actualmente
let activePreviewCard = null;

/**
 * Buscar el objeto canción por su ID en la base de datos del torneo.
 */
function findSongById(songId) {
  return tournament.allSongs.find(s => s.id === songId) || null;
}

/**
 * Normalizar texto para comparación: minúsculas, sin acentos, sin caracteres especiales.
 */
function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Limpia el título de una canción de términos de colaboración y paréntesis para mejorar la búsqueda y coincidencia.
 */
function cleanSongTitle(title) {
  return title
    .replace(/\s*\(feat\..*?\)/gi, "")
    .replace(/\s*\(with.*?\)/gi, "")
    .replace(/\s*\(.*?\)/g, "")
    .replace(/\s*feat\..*/gi, "")
    .trim();
}

/**
 * Busca la URL del preview de 30 segundos para una canción usando la API de iTunes.
 * Usa título + álbum para búsqueda precisa y verifica que el resultado sea de Bad Bunny.
 * @param {string} songId - ID de la canción en nuestra base de datos
 * @returns {Promise<string|null>} URL del audio preview o null
 */
async function fetchPreviewUrl(songId) {
  const song = findSongById(songId);
  if (!song) return null;
  return song.previewUrl || null;
}

/**
 * Toggle: si ya está sonando esta canción, para. Si no, reproduce un snippet corto.
 * @param {string} songId
 * @param {HTMLElement} cardElement
 */
function togglePreview(songId, cardElement) {
  // Si ya está sonando la misma canción, parar
  if (currentPreviewSongId === songId && previewAudio && !previewAudio.paused) {
    stopPreview();
    return;
  }
  // Si está sonando otra, parar primero y reproducir esta
  playPreview(songId, cardElement);
}

/**
 * Reproduce el preview de una canción con fade-in y auto-stop tras ~5 segundos.
 * @param {string} songTitle
 * @param {HTMLElement} cardElement
 */
async function playPreview(songId, cardElement) {
  // Parar lo que estuviera sonando antes
  stopPreview();

  const url = await fetchPreviewUrl(songId);
  if (!url) {
    // Dar feedback visual de que no se encontró
    const btn = cardElement.querySelector(".btn-preview");
    if (btn) {
      btn.textContent = "❌";
      setTimeout(() => { btn.textContent = "🎧"; }, 1200);
    }
    return;
  }

  // Usar un único reproductor global para evitar solapamientos en móviles
  if (!window.globalAudioPlayer) {
    window.globalAudioPlayer = new Audio();
  }
  previewAudio = window.globalAudioPlayer;
  previewAudio.src = url;
  previewAudio.load(); // Fuerza a Safari a recargar el buffer del nuevo src
  previewAudio.volume = 0;
  previewAudio.crossOrigin = "anonymous";
  currentPreviewSongId = songId;
  activePreviewCard = cardElement;

  try {
    await previewAudio.play();
  } catch (err) {
    console.warn("[Audio Preview] Autoplay bloqueado por el navegador.", err);
    return;
  }

  // Mostrar indicador visual de audio en la tarjeta
  showAudioIndicator(cardElement, true);
  // Cambiar botón a modo "sonando"
  const btn = cardElement.querySelector(".btn-preview");
  if (btn) {
    btn.textContent = "⏸";
    btn.classList.add("previewing");
  }

  // Fade-in suave
  clearInterval(fadeInterval);
  const steps = 15;
  const stepTime = FADE_DURATION / steps;
  const volumeStep = PREVIEW_MAX_VOLUME / steps;
  let currentStep = 0;

  fadeInterval = setInterval(() => {
    currentStep++;
    if (previewAudio) {
      previewAudio.volume = Math.min(volumeStep * currentStep, PREVIEW_MAX_VOLUME);
    }
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
    }
  }, stepTime);

  // Auto-stop después de SNIPPET_DURATION
  clearTimeout(snippetTimer);
  snippetTimer = setTimeout(() => {
    stopPreview();
  }, SNIPPET_DURATION);
}

/**
 * Detiene el preview actual con un fade-out suave o inmediatamente.
 */
function stopPreview(immediate = false) {
  clearInterval(fadeInterval);
  clearTimeout(snippetTimer);

  // Restaurar botón del card activo
  if (activePreviewCard) {
    const btn = activePreviewCard.querySelector(".btn-preview");
    if (btn) {
      btn.textContent = "🎧";
      btn.classList.remove("previewing");
    }
  }

  if (!previewAudio) {
    // Quitar indicadores visuales por si acaso
    showAudioIndicator(document.getElementById("card-left"), false);
    showAudioIndicator(document.getElementById("card-right"), false);
    activePreviewCard = null;
    return;
  }

  const audio = previewAudio;
  const startVolume = audio.volume;

  // Quitar indicador visual de todas las tarjetas
  showAudioIndicator(document.getElementById("card-left"), false);
  showAudioIndicator(document.getElementById("card-right"), false);

  if (immediate) {
    audio.pause();
    audio.currentTime = 0;
    previewAudio = null;
    currentPreviewSongId = null;
    activePreviewCard = null;
    return;
  }

  // Fade-out rápido
  const steps = 8;
  const stepTime = 180 / steps;
  const volumeStep = startVolume / steps;
  let currentStep = 0;

  fadeInterval = setInterval(() => {
    currentStep++;
    const newVol = startVolume - volumeStep * currentStep;
    audio.volume = Math.max(newVol, 0);
    if (currentStep >= steps) {
      clearInterval(fadeInterval);
      audio.pause();
      audio.currentTime = 0;
    }
  }, stepTime);

  previewAudio = null;
  currentPreviewSongId = null;
  activePreviewCard = null;
}

/**
 * Muestra u oculta el indicador visual de audio (barras ecualizador) en una tarjeta.
 * @param {HTMLElement} cardElement
 * @param {boolean} show
 */
function showAudioIndicator(cardElement, show) {
  if (!cardElement) return;
  let indicator = cardElement.querySelector(".audio-indicator");
  if (show) {
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.className = "audio-indicator";
      indicator.innerHTML = `
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
        <div class="eq-bar"></div>
      `;
      cardElement.appendChild(indicator);
    }
    indicator.classList.add("playing");
  } else {
    if (indicator) {
      indicator.classList.remove("playing");
      setTimeout(() => indicator.remove(), 300);
    }
  }
}


// ==========================================
// SURVIVOR / ESPECIAL TOUR MODE LOGIC
// ==========================================

const SPECIAL_TOUR_IDS = [
  "sp-mudanza",
  "callaita",
  "sp-pitorro",
  "sp-weltita",
  "sp-turista",
  "sp-baile",
  "sp-nuevayol",
  "sp-velda",
  "titi-me-pregunto",
  "neverita",
  "si-veo-a-tu-mama",
  "la-romana",
  "sp-voy",
  "me-porto-bonito",
  "no-me-conoce",
  "bichiyal",
  "yo-perreo-sola",
  "efecto",
  "safaera",
  "monaco",
  "sp-cafe",
  "ojitos-lindos",
  "la-cancion",
  "sp-kloufrens",
  "dakiti",
  "el-apagon",
  "sp-dtmf",
  "sp-eoo"
];

let survivorState = {
  pool: [],
  reigningChamp: null,
  challenger: null,
  eliminated: [],
  streaks: {} // songId -> number of wins
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startSurvivorMode() {
  gameMode = 'survivor';
  
  analyticsTournamentStartMs = Date.now();
  if (typeof generateUUID === 'function') {
    analyticsTournamentId = generateUUID();
  }
  
  // Desbloquear reproductor global de audio para móviles (requiere interacción directa del usuario)
  if (!window.globalAudioPlayer) {
    window.globalAudioPlayer = new Audio();
  }
  window.globalAudioPlayer.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC0gUm95YWx0eSBGcmVlIFNvdW5kc///wQAAP8AAAAA//8GAAAP//AAAP/wAAAAAP/wAA";
  window.globalAudioPlayer.play().then(() => {
    window.globalAudioPlayer.pause();
  }).catch(e => { console.log("Unlock failed", e) });
  
  // 1. Gather all special tour songs that exist in database
  let pool = [];
  SPECIAL_TOUR_IDS.forEach(id => {
    const song = findSongById(id);
    if (song) pool.push(song);
  });
  
  // 2. Add 1 random song from the rest of the database
  const availableRandoms = SONGS_DATABASE.filter(s => !SPECIAL_TOUR_IDS.includes(s.id));
  if (availableRandoms.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableRandoms.length);
    pool.push(availableRandoms[randomIndex]);
  }
  
  // Shuffle the pool
  shuffleArray(pool);
  
  survivorState.pool = pool;
  survivorState.eliminated = [];
  survivorState.streaks = {};
  pool.forEach(s => survivorState.streaks[s.id] = 0);
  
  // Pop the first two to face off
  survivorState.reigningChamp = survivorState.pool.pop();
  survivorState.challenger = survivorState.pool.pop();
  
  // Setup UI
  document.getElementById("mode-selection-screen").classList.add("hidden");
  document.getElementById("config-screen").classList.add("hidden");
  document.getElementById("arena-screen").classList.remove("hidden");
  const nb3 = document.getElementById("nav-bracket"); nb3.classList.remove("hidden"); nb3.style.display = 'flex';
  
  document.getElementById("tab-bracket-btn").innerHTML = "📊 Leaderboard";
  document.getElementById("bracket-container").classList.add("hidden");
  document.getElementById("survivor-leaderboard").classList.remove("hidden");
  
  // Ocultar barra de progreso y texto de enfrentamiento (ya que no es un bracket fijo)
  document.querySelector(".progress-bar-container").classList.add("hidden");
  const matchProgress = document.getElementById("match-progress");
  matchProgress.classList.add("hidden");
  matchProgress.innerHTML = "";
  document.getElementById("round-title").innerHTML = TRANSLATIONS[currentLang].survivor_progress.replace('{count}', survivorState.pool.length + 2);
  
  renderSurvivorMatch();
  renderSurvivorLeaderboard();
}

function renderSurvivorMatch() {
  analyticsMatchStartMs = Date.now();
  const songA = survivorState.reigningChamp;
  const songB = survivorState.challenger;
  
  const cardLeft = document.getElementById("card-left");
  const cardRight = document.getElementById("card-right");
  
  // Remove win animation classes
  cardLeft.classList.remove("winner-anim");
  cardRight.classList.remove("winner-anim");

  // Reset opacity/scale
  cardLeft.style.opacity = "1";
  cardLeft.style.transform = "scale(1)";
  cardRight.style.opacity = "1";
  cardRight.style.transform = "scale(1)";
  
  applyThemeToCard(cardLeft, songA);
  applyThemeToCard(cardRight, songB);
  
  document.getElementById("left-emoji").textContent = songA.emoji;
  document.getElementById("left-title").textContent = songA.title;
  document.getElementById("left-album").textContent = songA.album;
  document.getElementById("left-year").textContent = songA.year;

  document.getElementById("right-emoji").textContent = songB.emoji;
  document.getElementById("right-title").textContent = songB.title;
  document.getElementById("right-album").textContent = songB.album;
  document.getElementById("right-year").textContent = songB.year;
  
  // Special Badges
  cardLeft.querySelector(".card-badge").textContent = TRANSLATIONS[currentLang].survivor_champ.replace('{streak}', survivorState.streaks[songA.id]);
  cardRight.querySelector(".card-badge").textContent = TRANSLATIONS[currentLang].survivor_challenger;
  
  document.getElementById("card-left").dataset.previewSongId = songA.id;
  document.getElementById("card-right").dataset.previewSongId = songB.id;
  
  fetchPreviewUrl(songA.id);
  fetchPreviewUrl(songB.id);
  
  document.getElementById("round-title").innerHTML = TRANSLATIONS[currentLang].survivor_progress.replace('{count}', survivorState.pool.length + 2);
}

function handleSurvivorVote(winnerId) {
  stopPreview(true);
  
  const isLeftWinner = winnerId === survivorState.reigningChamp.id;
  const winner = isLeftWinner ? survivorState.reigningChamp : survivorState.challenger;
  const loser = isLeftWinner ? survivorState.challenger : survivorState.reigningChamp;
  
  // Analytics
  const responseTime = Date.now() - analyticsMatchStartMs;
  if (typeof trackDuelVote === 'function') {
    trackDuelVote(gameMode, analyticsTournamentId, 1, survivorState.reigningChamp.id, survivorState.challenger.id, winner.id, loser.id, isLeftWinner ? 'left' : 'right', responseTime);
  }
  
  // Animaciones
  const winningCard = document.getElementById(isLeftWinner ? "card-left" : "card-right");
  const losingCard = document.getElementById(isLeftWinner ? "card-right" : "card-left");
  
  winningCard.classList.add("winner-anim");
  losingCard.style.opacity = "0.5";
  losingCard.style.transform = "scale(0.95)";
  
  // Logica
  survivorState.streaks[winner.id]++;
  survivorState.eliminated.unshift(loser); // Add to top of eliminated list
  
  setTimeout(() => {
    if (survivorState.pool.length === 0) {
      endSurvivorMode(winner);
    } else {
      survivorState.reigningChamp = winner; // Winner stays
      survivorState.challenger = survivorState.pool.pop(); // New challenger arrives
      renderSurvivorMatch();
      renderSurvivorLeaderboard();
    }
  }, 600);
}

function renderSurvivorLeaderboard() {
  const container = document.getElementById("survivor-leaderboard");
  container.innerHTML = "";
  
  if (survivorState.reigningChamp) {
    const champ = survivorState.reigningChamp;
    container.innerHTML += `
      <div class="p-3 bg-white bg-opacity-10 rounded border border-yellow-500 mb-4 flex justify-between">
        <span class="font-bold text-yellow-500">${TRANSLATIONS[currentLang].survivor_leaderboard_champ.replace('{title}', champ.title)}</span>
        <span class="text-yellow-500 font-bold">${TRANSLATIONS[currentLang].survivor_leaderboard_wins.replace('{streak}', survivorState.streaks[champ.id])}</span>
      </div>
    `;
  }
  
  if (survivorState.eliminated.length > 0) {
    container.innerHTML += `<h3 class="text-gray-400 text-sm mb-2">${TRANSLATIONS[currentLang].survivor_cemetery}</h3>`;
    survivorState.eliminated.forEach((song, i) => {
      container.innerHTML += `
        <div class="p-2 bg-black bg-opacity-30 border border-red-900 rounded flex justify-between text-gray-500 text-sm">
          <span>💀 ${song.title}</span>
          <span>${TRANSLATIONS[currentLang].survivor_leaderboard_wins.replace('{streak}', survivorState.streaks[song.id])}</span>
        </div>
      `;
    });
  }
}

function endSurvivorMode(winner) {
  document.getElementById("arena-screen").classList.add("hidden");
  document.getElementById("winner-screen").classList.remove("hidden");
  
  document.getElementById("winner-emoji").textContent = winner.emoji;
  document.getElementById("winner-title").textContent = winner.title;
  document.getElementById("winner-album").textContent = winner.album;
  
  const theme = THEME_STYLES[winner.theme] || THEME_STYLES.singles;
  document.getElementById("winner-banner").style.background = `linear-gradient(135deg, ${theme.color1}, ${theme.color2})`;
  
  injectShareWinner(winner);

  const topList = document.getElementById("ranking-list");
  topList.innerHTML = "";
  
  // Ocultar título genérico "Tu Top de Canciones" por algo más específico
  topList.parentElement.querySelector("h3").textContent = currentLang === 'en' ? "🏆 Survival Records" : "🏆 Récords de Supervivencia";
  
  // Ordenar todas las canciones por rachas ganadas
  const allSongs = [winner, ...survivorState.eliminated];
  allSongs.sort((a, b) => survivorState.streaks[b.id] - survivorState.streaks[a.id]);
  
  // Top 3: ganadora + las 2 siguientes más resistentes
  const survivors = allSongs
    .filter(s => survivorState.streaks[s.id] > 0 || s.id === winner.id)
    .slice(0, 3);
  
  const tourMedals = ['👑','🥈','🥉'];
  survivors.forEach((song, idx) => {
    const li = document.createElement("div");
    const isWinner = idx === 0;
    li.style.cssText = `display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; background:${isWinner ? 'rgba(255,75,43,0.2)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${isWinner ? 'rgba(255,75,43,0.5)' : 'rgba(255,255,255,0.08)'}; margin-bottom:6px;`;
    li.innerHTML = `
      <span style="font-size:${isWinner ? '1.8rem' : '1.3rem'}; width:32px; text-align:center;">${tourMedals[idx]}</span>
      <span style="font-size:1.2rem;">${song.emoji}</span>
      <div style="flex:1;">
        <p style="font-weight:700; color:white; font-size:${isWinner ? '1rem' : '0.875rem'};">${song.title}</p>
        <p style="font-size:0.7rem; color:#f97316;">${TRANSLATIONS[currentLang].survivor_leaderboard_wins.replace('{streak}', survivorState.streaks[song.id])}</p>
      </div>
    `;
    topList.appendChild(li);
  });
  
  launchConfetti();
  
  // Supabase Analytics
  const topSongs = survivors.map(s => s.id);
  if (typeof trackTournamentResult === 'function') {
    const duration = Date.now() - analyticsTournamentStartMs;
    const eras = Array.from(document.querySelectorAll(".album-checkbox:checked")).map(cb => cb.value);
    // En survivor el totalDuels es cuantas veces ha cambiado el challenger o ganado (aprox total songs - 1)
    const totalDuels = survivorState.pool.length + survivorState.eliminated.length; 
    trackTournamentResult('survivor', null, eras, winner.id, null, topSongs, totalDuels, duration, false);
    trackEvent('tournament_completed', 'survivor');
  }
}

// =====================================================================
// MODO TRIVIA (BLIND TEST)
// =====================================================================
let quizState = {
  questions: [],
  currentIndex: 0,
  score: 0,
  startTime: 0,
  timerInterval: null,
  correctSongs: 0,
  totalTime: 0
};

function startQuizMode() {
  gameMode = 'quiz';
  
  analyticsTournamentStartMs = Date.now();
  if (typeof generateUUID === 'function') {
    analyticsTournamentId = generateUUID();
  }
  
  // Setup UI
  document.getElementById("mode-selection-screen").classList.add("hidden");
  document.getElementById("config-screen").classList.add("hidden");
  document.getElementById("arena-screen").classList.add("hidden");
  document.getElementById("winner-screen").classList.add("hidden");
  document.getElementById("quiz-winner-screen").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  
  // Desbloquear reproductor global de audio para móviles (requiere interacción directa del usuario)
  if (!window.globalAudioPlayer) {
    window.globalAudioPlayer = new Audio();
  }
  // Añadimos un mp3 silencioso en base64 para que el play() no lance error y se desbloquee el contexto de audio
  window.globalAudioPlayer.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC0gUm95YWx0eSBGcmVlIFNvdW5kc///wQAAP8AAAAA//8GAAAP//AAAP/wAAAAAP/wAA";
  window.globalAudioPlayer.play().then(() => {
    window.globalAudioPlayer.pause();
  }).catch(e => { console.log("Unlock failed", e) });
  
  // Seleccionar 10 canciones aleatorias únicas que tengan audio
  let pool = SONGS_DATABASE.filter(s => s.previewUrl);
  shuffleArray(pool);
  quizState.questions = pool.slice(0, 10);
  
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.correctSongs = 0;
  quizState.totalTime = 0;
  
  trackEvent('trivia_started', gameMode);
  renderQuizQuestion();
}

function renderQuizQuestion() {
  clearInterval(quizState.timerInterval);
  stopPreview();
  
  const currentSong = quizState.questions[quizState.currentIndex];
  document.getElementById("quiz-progress-text").textContent = TRANSLATIONS[currentLang].quiz_question.replace('{current}', quizState.currentIndex + 1).replace('{total}', 10);
  
  // Generar 3 opciones falsas (para hacer un total de 4 con la correcta)
  let options = [currentSong];
  let pool = SONGS_DATABASE.filter(s => s.id !== currentSong.id);
  shuffleArray(pool);
  options = options.concat(pool.slice(0, 3));
  shuffleArray(options); // Mezclar la correcta entre las falsas
  
  const container = document.getElementById("quiz-options-container");
  container.innerHTML = "";
  
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn";
    btn.dataset.songId = opt.id;
    btn.innerHTML = `<span class="quiz-option-text">${opt.title}</span>`;
    btn.onclick = () => handleQuizAnswer(opt.id, currentSong.id, btn);
    container.appendChild(btn);
  });
  
  // Iniciar timer
  quizState.startTime = Date.now();
  const timerEl = document.getElementById("quiz-timer");
  timerEl.textContent = "15.0s";
  timerEl.style.color = "#38ef7d";
  
  // Limpiar mensaje de feedback previo
  const feedbackEl = document.getElementById("quiz-feedback-msg");
  if (feedbackEl) feedbackEl.remove();
  
  quizState.timerInterval = setInterval(() => {
    const elapsed = (Date.now() - quizState.startTime) / 1000;
    const remaining = Math.max(0, 15 - elapsed);
    timerEl.textContent = remaining.toFixed(1) + "s";
    
    if (remaining <= 3) timerEl.style.color = "#ff4b2b";
    else if (remaining <= 7) timerEl.style.color = "#ffd700";
    
    if (remaining <= 0) {
      clearInterval(quizState.timerInterval);
      handleQuizAnswer(null, currentSong.id, null); // Tiempo agotado
    }
  }, 100);
  
  // Reproducir audio usando el reproductor global para evitar bloqueos en móviles
  fetchPreviewUrl(currentSong.id).then(url => {
    if (!url) return; // Fallback si no hay URL
    
    if (!window.globalAudioPlayer) window.globalAudioPlayer = new Audio();
    window.globalAudioPlayer.src = url;
    window.globalAudioPlayer.volume = 0.5;
    window.globalAudioPlayer.play().catch(e => console.log("Autoplay blocked", e));
    window.currentPreviewAudio = window.globalAudioPlayer;
  });
}

function handleQuizAnswer(selectedId, correctId, btnElement) {
  clearInterval(quizState.timerInterval);
  
  // Detener audio inmediatamente
  if (window.currentPreviewAudio) {
    window.currentPreviewAudio.pause();
    window.currentPreviewAudio = null;
  }
  
  const timeTaken = (Date.now() - quizState.startTime) / 1000;
  quizState.totalTime += timeTaken;
  
  if (typeof trackTriviaAnswer === 'function') {
    trackTriviaAnswer(analyticsTournamentId, quizState.currentIndex + 1, correctId, selectedId, selectedId === correctId, Math.round(timeTaken * 1000), false);
  }
  
  const buttons = document.getElementById("quiz-options-container").querySelectorAll("button");
  buttons.forEach(b => b.disabled = true);
  
  const feedbackEl = document.createElement("div");
  feedbackEl.id = "quiz-feedback-msg";
  feedbackEl.className = "text-xl font-bold mb-4 animate-bounce";
  
  const correctSong = findSongById(correctId);
  
  if (selectedId === correctId) {
    // Acierto
    quizState.correctSongs++;
    const speedBonus = Math.max(0, 15 - timeTaken);
    quizState.score += Math.round(1000 + (speedBonus * 50));
    if (btnElement) btnElement.classList.add("correct-answer");
    feedbackEl.innerHTML = currentLang === 'en' ? `✅ CORRECT!` : `✅ ¡CORRECTO!`;
    feedbackEl.style.color = "#38ef7d";
  } else {
    // Fallo o tiempo agotado
    quizState.score -= 500;
    if (btnElement) btnElement.classList.add("wrong-answer");
    // Resaltar el correcto
    const correctBtn = Array.from(buttons).find(b => b.dataset.songId === correctSong.id);
    if (correctBtn) correctBtn.classList.add("correct-answer");
    const wrongText = currentLang === 'en' ? '❌ WRONG' : '❌ FALLO';
    const eraText = currentLang === 'en' ? 'Era' : 'Era';
    feedbackEl.innerHTML = `${wrongText} <span class="text-sm block mt-1 text-gray-300">${eraText}: ${correctSong.title}</span>`;
    feedbackEl.style.color = "#ff4b2b";
  }
  
  document.getElementById("quiz-options-container").prepend(feedbackEl);
  
  setTimeout(() => {
    quizState.currentIndex++;
    if (quizState.currentIndex >= 10) {
      endQuizMode();
    } else {
      renderQuizQuestion();
    }
  }, 2000); // Dar 2 segundos para leer el feedback
}

function endQuizMode() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("quiz-winner-screen").classList.remove("hidden");
  
  document.getElementById("quiz-result-correct").textContent = `${quizState.correctSongs} / 10`;
  const avgTime = (quizState.totalTime / 10).toFixed(1);
  document.getElementById("quiz-result-time").textContent = `${avgTime}s`;
  document.getElementById("quiz-result-score").textContent = Math.max(0, quizState.score);
  
  // Analytics
  if (typeof trackTriviaResult === 'function') {
    const duration = Date.now() - analyticsTournamentStartMs;
    trackTriviaResult(analyticsTournamentId, 10, quizState.correctSongs, Math.max(0, quizState.score), Math.round((quizState.totalTime / 10) * 1000), duration, false);
    trackEvent('trivia_completed', gameMode);
  }
  
  // Guardar en LocalStorage
  let leaderboard = [];
  try {
    leaderboard = JSON.parse(localStorage.getItem("bb_quiz_leaderboard") || "[]");
    if (!Array.isArray(leaderboard)) leaderboard = [];
  } catch (e) {
    console.error("Error parsing leaderboard", e);
    leaderboard = [];
  }
  
  leaderboard.push({
    score: Math.max(0, quizState.score),
    correct: quizState.correctSongs,
    time: avgTime,
    date: new Date().toLocaleDateString()
  });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 3); // Top 3
  try {
    localStorage.setItem("bb_quiz_leaderboard", JSON.stringify(leaderboard));
  } catch (e) {
    console.error("Error saving leaderboard", e);
  }
  
  // Render Leaderboard
  const listEl = document.getElementById("quiz-leaderboard-list");
  listEl.innerHTML = "";
  const quizMedals = ['🥇','🥈','🥉'];
  leaderboard.forEach((entry, idx) => {
    const div = document.createElement("div");
    const isTop = idx === 0;
    div.style.cssText = `display:flex; align-items:center; gap:10px; padding:10px 12px; border-radius:10px; background:${isTop ? 'rgba(56,239,125,0.1)' : 'rgba(255,255,255,0.04)'}; border:1px solid ${isTop ? 'rgba(56,239,125,0.3)' : 'rgba(255,255,255,0.08)'}; margin-bottom:6px;`;
    div.innerHTML = `
      <span style="font-size:${isTop ? '1.8rem' : '1.3rem'}; width:32px; text-align:center;">${quizMedals[idx]}</span>
      <div style="flex:1;">
        <p style="font-weight:700; color:white; font-size:${isTop ? '1rem' : '0.875rem'};">⚡ ${entry.correct}/10 correctas</p>
        <p style="font-size:0.7rem; color:#9ca3af;">${entry.time}s promedio · ${entry.date}</p>
      </div>
      <div style="font-weight:800; color:#ffd700; font-size:${isTop ? '1.1rem' : '0.95rem'}">${entry.score.toLocaleString()} pts</div>
    `;
    listEl.appendChild(div);
  });
  
  launchConfetti();

  const btnShare = document.getElementById("btn-share-quiz");
  // Se asigna en HTML vía onclick="shareQuizResults(event)"
}

async function shareQuizResults(event) {
  if (event && event.target) {
    const btn = event.currentTarget || document.getElementById("btn-share-quiz");
    if (btn) btn.innerHTML = "Copiando...";
  }
  
  const avgTime = (quizState.totalTime / 10).toFixed(1);
  const shareData = {
    title: 'Reto Bad Bunny Trivia',
    text: `${TRANSLATIONS[currentLang].share_quiz_text.replace('{correct}', quizState.correctSongs).replace('{time}', avgTime).replace('{score}', Math.max(0, quizState.score))}\n\nhttps://copaconejo.vercel.app`
  };
  
  try {
    if (navigator.share) {
      await navigator.share({ title: shareData.title, text: shareData.text });
    } else {
      throw new Error("No share API");
    }
  } catch (err) {
    console.log('Error sharing:', err);
    try {
      // Fallback a portapapeles
      const textArea = document.createElement("textarea");
      textArea.value = shareData.text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert(currentLang === 'en' ? "Link and result copied to clipboard! Ready to share." : "¡Enlace y resultado copiados al portapapeles! Listo para compartir.");
    } catch(clipboardErr) {
      alert(`Tu resultado:\n\n${shareData.text}`);
    }
  }
}

async function shareAsImage(elementId, filename) {
  if (typeof html2canvas === 'undefined') {
    alert("Error: Librería de captura no encontrada.");
    return;
  }
  
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Guardamos referencia al boton si event está definido
  const btn = window.event && window.event.currentTarget ? window.event.currentTarget : null;
  const oldText = btn ? btn.innerHTML : "";
  if (btn) btn.innerHTML = "Generando imagen... 📸";

  try {
    // Si el cuadro está oculto, lo mostramos momentaneamente pero escondido del usuario
    const isHidden = element.classList.contains('hidden');
    if (isHidden) {
      element.classList.remove('hidden');
      element.style.position = 'absolute';
      element.style.left = '-9999px';
    }
    
    // Capturamos el DOM
    const canvas = await html2canvas(element, {
      backgroundColor: '#0a0a0a', // Color de fondo del juego
      scale: 2, // Retained display quality
      useCORS: true, // Permitir cargar imágenes si las hubiera
      logging: false
    });
    
    if (isHidden) {
      element.classList.add('hidden');
      element.style.position = '';
      element.style.left = '';
    }

    // Convertir canvas a blob
    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error("Error generating blob");
      
      const file = new File([blob], `${filename}.png`, { type: 'image/png' });
      
      // Intentar Share API (nativo iOS/Android)
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            title: 'La Copa Conejo',
            text: '¡Mira mis resultados en La Copa Conejo! 🐰🔥\nhttps://copaconejo.vercel.app',
            files: [file]
          });
        } catch (shareErr) {
          // El usuario canceló o hubo error. Como fallback siempre podemos forzar la descarga.
          console.log("Share API falló o cancelado", shareErr);
          if (shareErr.name !== 'AbortError') {
             downloadFallback(blob, filename);
          }
        }
      } else {
        // Fallback: Descarga directa para escritorio u otros navegadores
        downloadFallback(blob, filename);
      }
      
      if (btn) btn.innerHTML = oldText;
      if (typeof trackEvent === 'function') trackEvent('image_shared', elementId);
      
    }, 'image/png');
    
  } catch (err) {
    console.error("Error generating image:", err);
    alert("Hubo un error al generar la imagen. Inténtalo de nuevo.");
    if (btn) btn.innerHTML = oldText;
  }
}

function downloadFallback(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
