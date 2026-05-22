const fs = require('fs');

const appPath = '/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/app.js';
const appJS = fs.readFileSync(appPath, 'utf8');

// Extract SONGS_DATABASE from app.js
const dbRegex = /const SONGS_DATABASE = \[[[\s\S]*?\];/;
const match = appJS.match(dbRegex);
const dbCode = match ? match[0] : '';

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Verificar Audios - La Copa Conejo</title>
  <style>
    body { font-family: 'Outfit', sans-serif; background: #111; color: white; padding: 20px; }
    h1 { text-align: center; margin-bottom: 30px; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 15px; }
    .card { background: #222; border-radius: 12px; padding: 15px; border: 1px solid #333; display: flex; flex-direction: column; gap: 10px; }
    .title { font-weight: bold; font-size: 1.1em; }
    .album { font-size: 0.9em; color: #aaa; }
    audio { width: 100%; height: 40px; margin-top: auto; }
    .success { border-left: 4px solid #4ade80; }
    .error { border-left: 4px solid #f87171; }
  </style>
</head>
<body>
  <h1>✅ Verificación de las Canciones</h1>
  <p style="text-align:center; color:#ccc; margin-bottom:30px;">
    Aquí puedes escuchar los 30 segundos oficiales de Apple Music para cada canción en la base de datos estática.<br>
    Dale al botón de <strong>Play ▶️</strong> de cualquiera para confirmarlo.
  </p>

  <div class="grid" id="songs-container"></div>

  <script>
    ${dbCode}

    const container = document.getElementById('songs-container');
    
    SONGS_DATABASE.forEach((song, idx) => {
      const card = document.createElement('div');
      card.className = 'card ' + (song.previewUrl ? 'success' : 'error');
      
      card.innerHTML = \`
        <div class="title">\${idx + 1}. \${song.emoji} \${song.title}</div>
        <div class="album">\${song.album} <span style="color: #888; font-size: 0.9em; border: 1px solid #444; padding: 2px 6px; border-radius: 4px; margin-left: 5px;">\${song.year}</span></div>
        <audio controls preload="none">
          <source src="\${song.previewUrl}" type="audio/mp4">
          Tu navegador no soporta el elemento de audio.
        </audio>
      \`;
      
      container.appendChild(card);
    });
  </script>
</body>
</html>`;

fs.writeFileSync('/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/verify.html', htmlContent);
console.log("Created verify.html with updated DTMF tracks successfully.");
