const fs = require('fs');

const appPath = '/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/app.js';
let appJS = fs.readFileSync(appPath, 'utf8');

const survivorLogic = `

// ==========================================
// SURVIVOR / ESPECIAL TOUR MODE LOGIC
// ==========================================

let gameMode = 'classic'; // 'classic' or 'survivor'

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

function startSurvivorMode() {
  gameMode = 'survivor';
  
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
  document.getElementById("battle-screen").classList.remove("hidden");
  
  document.getElementById("tab-bracket-text").textContent = "Leaderboard";
  document.getElementById("bracket-container").classList.add("hidden");
  document.getElementById("survivor-leaderboard").classList.remove("hidden");
  
  // Ocultar barra de progreso (ya que no es un bracket fijo)
  document.querySelector(".progress-bar-container").style.display = "none";
  document.getElementById("round-title").innerHTML = \`Modo Survivor <span class="text-xs ml-2 text-gray-400">Quedan \${survivorState.pool.length + 2} canciones</span>\`;
  
  renderSurvivorMatch();
  renderSurvivorLeaderboard();
}

function renderSurvivorMatch() {
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
  cardLeft.querySelector(".card-badge").textContent = \`👑 Campeón (Rachas: \${survivorState.streaks[songA.id]})\`;
  cardRight.querySelector(".card-badge").textContent = "⚔️ Retador";
  
  document.getElementById("card-left").dataset.previewSongId = songA.id;
  document.getElementById("card-right").dataset.previewSongId = songB.id;
  
  fetchPreviewUrl(songA.id);
  fetchPreviewUrl(songB.id);
  
  document.getElementById("round-title").innerHTML = \`Modo Survivor <span class="text-xs ml-2 text-gray-400">Restantes: \${survivorState.pool.length + 2}</span>\`;
}

function handleSurvivorVote(winnerId) {
  stopPreview();
  
  const isLeftWinner = winnerId === survivorState.reigningChamp.id;
  const winner = isLeftWinner ? survivorState.reigningChamp : survivorState.challenger;
  const loser = isLeftWinner ? survivorState.challenger : survivorState.reigningChamp;
  
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
    container.innerHTML += \`
      <div class="p-3 bg-white bg-opacity-10 rounded border border-yellow-500 mb-4 flex justify-between">
        <span class="font-bold text-yellow-500">👑 Campeón Actual: \${champ.title}</span>
        <span class="text-yellow-500 font-bold">\${survivorState.streaks[champ.id]} Victorias</span>
      </div>
    \`;
  }
  
  if (survivorState.eliminated.length > 0) {
    container.innerHTML += \`<h3 class="text-gray-400 text-sm mb-2">Cementerio (Eliminados)</h3>\`;
    survivorState.eliminated.forEach((song, i) => {
      container.innerHTML += \`
        <div class="p-2 bg-black bg-opacity-30 border border-red-900 rounded flex justify-between text-gray-500 text-sm">
          <span>💀 \${song.title}</span>
          <span>Sobrevivió \${survivorState.streaks[song.id]} tandas</span>
        </div>
      \`;
    });
  }
}

function endSurvivorMode(winner) {
  document.getElementById("battle-screen").classList.add("hidden");
  document.getElementById("winner-screen").classList.remove("hidden");
  
  document.getElementById("winner-emoji").textContent = winner.emoji;
  document.getElementById("winner-title").textContent = winner.title;
  document.getElementById("winner-album").textContent = winner.album;
  
  const theme = THEME_STYLES[winner.theme] || THEME_STYLES.singles;
  document.getElementById("winner-banner").style.background = \`linear-gradient(135deg, \${theme.color1}, \${theme.color2})\`;
  
  const topList = document.getElementById("top-songs-list");
  topList.innerHTML = "";
  
  // Sort eliminated by streaks to get the top survivor leaderboard
  const allSongs = [winner, ...survivorState.eliminated];
  allSongs.sort((a, b) => survivorState.streaks[b.id] - survivorState.streaks[a.id]);
  
  allSongs.slice(0, 8).forEach((song, idx) => {
    const li = document.createElement("li");
    li.className = "flex justify-between items-center p-3 rounded bg-white bg-opacity-5";
    li.innerHTML = \`
      <div class="flex items-center gap-3">
        <span class="text-xl font-bold opacity-50">\${idx + 1}</span>
        <span>\${song.emoji} \${song.title}</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs text-yellow-500">\${survivorState.streaks[song.id]} 🏆</span>
        <button class="btn-preview-mini" onclick="playMiniPreview('\${song.id}')">▶️</button>
      </div>
    \`;
    topList.appendChild(li);
  });
  
  triggerConfetti();
}

// Intercept vote clicks
function hookVoteEvents() {
  const cardLeft = document.getElementById("card-left");
  const cardRight = document.getElementById("card-right");
  
  // We need to modify the existing handleVote call in app.js
  // Let's hook into the global scope. The existing handleVote takes (songA.id).
}
`;

if (!appJS.includes('SURVIVOR / ESPECIAL TOUR MODE LOGIC')) {
  appJS += survivorLogic;

  // Insert mode selection listeners into DOMContentLoaded
  const modeListeners = `
  const btnModeClassic = document.getElementById("btn-mode-classic");
  const btnModeSurvivor = document.getElementById("btn-mode-survivor");
  if (btnModeClassic) {
    btnModeClassic.addEventListener("click", () => {
      gameMode = 'classic';
      document.getElementById("mode-selection-screen").classList.add("hidden");
      document.getElementById("config-screen").classList.remove("hidden");
      renderConfigScreen();
    });
  }
  if (btnModeSurvivor) {
    btnModeSurvivor.addEventListener("click", startSurvivorMode);
  }
`;
  
  appJS = appJS.replace('document.getElementById("btn-start-tournament").addEventListener("click", startTournament);', `document.getElementById("btn-start-tournament").addEventListener("click", startTournament);\n${modeListeners}`);
  
  // Modify handleVote to branch based on gameMode
  appJS = appJS.replace('function handleVote(winnerId) {', `function handleVote(winnerId) {
  if (gameMode === 'survivor') {
    handleSurvivorVote(winnerId);
    return;
  }`);

  fs.writeFileSync(appPath, appJS, 'utf8');
  console.log("Successfully appended Survivor mode logic to app.js");
} else {
  console.log("Survivor mode logic already present in app.js");
}

