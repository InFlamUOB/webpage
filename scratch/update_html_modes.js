const fs = require('fs');

const indexPath = '/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/index.html';
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Insert Mode Selection Screen right after <main class="main-content">
const modeSelectionHTML = `
    <!-- PANTALLA 0: Selección de Modo -->
    <section id="mode-selection-screen" class="glass-panel text-center fade-in">
      <h2 class="text-3xl font-bold mb-4 font-display neon-text uppercase tracking-widest text-shadow">Elige tu Modo</h2>
      <p class="text-gray-300 mb-8 max-w-md mx-auto">Selecciona la experiencia que quieres jugar. Puedes armar tu torneo por eras o jugar el setlist oficial del Tour 2025.</p>

      <div class="flex flex-col gap-6 max-w-sm mx-auto">
        <button id="btn-mode-classic" class="btn-primary flex flex-col items-center justify-center p-4">
          <span class="text-xl mb-1">🏆 Torneo Clásico</span>
          <span class="text-xs text-gray-200 font-normal opacity-80">Arma tu propio cuadro eliminatorio seleccionando eras.</span>
        </button>
        
        <button id="btn-mode-survivor" class="btn-primary flex flex-col items-center justify-center p-4" style="background: linear-gradient(135deg, #ff4b2b, #ff416c);">
          <span class="text-xl mb-1">🔥 Especial Tour 2025</span>
          <span class="text-xs text-gray-200 font-normal opacity-80">Modo Supervivencia: Rey de la Colina con el Setlist Oficial de DTMF. ¡Juegan 2, gana 1 y sigue en la pista!</span>
        </button>
      </div>
    </section>
`;

if (!indexHtml.includes('PANTALLA 0: Selección de Modo')) {
  indexHtml = indexHtml.replace('<main class="main-content">', `<main class="main-content">\n${modeSelectionHTML}`);
  // Hide config screen initially
  indexHtml = indexHtml.replace('<section id="config-screen" class="glass-panel text-center fade-in">', '<section id="config-screen" class="glass-panel text-center fade-in hidden">');
  
  // Modify Bracket title for survivor
  indexHtml = indexHtml.replace('<span class="hidden sm:inline">Cuadro Completo</span>', '<span class="hidden sm:inline" id="tab-bracket-text">Cuadro Completo</span>');
  
  // Update bracket container to support the survivor leaderboard
  indexHtml = indexHtml.replace('<div id="bracket-container" class="bracket-container"></div>', '<div id="bracket-container" class="bracket-container"></div>\n        <div id="survivor-leaderboard" class="hidden flex flex-col gap-3 max-w-2xl mx-auto w-full pb-8"></div>');

  fs.writeFileSync(indexPath, indexHtml, 'utf8');
  console.log("index.html updated with mode selection screen.");
} else {
  console.log("index.html already has mode selection screen.");
}
