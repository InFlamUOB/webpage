const fs = require('fs');

// Read app.js
let content = fs.readFileSync('/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/app.js', 'utf8');

// Read the new database code
const dbCode = fs.readFileSync('scratch/database_code.js', 'utf8');

// 1. Replace the database array
// The database is between:
// const SONGS_DATABASE = [
// ...
// ];
// Let's use a regex to find const SONGS_DATABASE = [ ... ]; and replace it with dbCode
const dbRegex = /const SONGS_DATABASE = \[[[\s\S]*?\];/;
if (dbRegex.test(content)) {
  content = content.replace(dbRegex, dbCode);
  console.log("Successfully replaced SONGS_DATABASE!");
} else {
  console.error("Could not find SONGS_DATABASE to replace!");
}

// 2. Remove updateCustomSongsList(); on line 616
content = content.replace("updateCustomSongsList();", "");
console.log("Removed updateCustomSongsList() call.");

// 3. Fix the validation error message
const oldMsg = "errorMsg.textContent = `⚠️ Necesitas al menos ${tournament.size} canciones seleccionadas (tienes ${pool.length}). Activa más álbumes o añade canciones personalizadas abajo.`;";
const newMsg = "errorMsg.textContent = `⚠️ Necesitas al menos ${tournament.size} canciones seleccionadas (tienes ${pool.length}). Activa más álbumes.`;";
if (content.includes(oldMsg)) {
  content = content.replace(oldMsg, newMsg);
  console.log("Successfully simplified the selection error message!");
} else {
  console.warn("Could not find the exact selection error message to replace!");
}

// 4. Simplify fetchPreviewUrl
// Look for: async function fetchPreviewUrl(songId) { ... }
// We can use a regex to match from async function fetchPreviewUrl(songId) { until the matching closing brace,
// but let's replace it by matching line range or exact function block.
// Let's find the exact starting index of async function fetchPreviewUrl(songId) {
const startStr = "async function fetchPreviewUrl(songId) {";
const startIndex = content.indexOf(startStr);
if (startIndex !== -1) {
  // Find the closing brace of the function.
  // In the file, the next function is /**\n * Toggle: si ya está sonando
  const nextFuncIndex = content.indexOf(" * Toggle: si ya está sonando", startIndex);
  if (nextFuncIndex !== -1) {
    // Look backwards from nextFuncIndex to find the end brace of the previous function
    const endBraceIndex = content.lastIndexOf("}", nextFuncIndex);
    if (endBraceIndex !== -1 && endBraceIndex > startIndex) {
      const oldFuncBlock = content.substring(startIndex, endBraceIndex + 1);
      const newFuncBlock = `async function fetchPreviewUrl(songId) {
  const song = findSongById(songId);
  if (!song) return null;
  return song.previewUrl || null;
}`;
      content = content.replace(oldFuncBlock, newFuncBlock);
      console.log("Successfully simplified fetchPreviewUrl function!");
    } else {
      console.error("Could not find the end brace of fetchPreviewUrl!");
    }
  } else {
    console.error("Could not find the next function start after fetchPreviewUrl!");
  }
} else {
  console.error("Could not find start of fetchPreviewUrl!");
}

// Write the modified content back to app.js
fs.writeFileSync('/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/app.js', content, 'utf8');
console.log("Saved changes to app.js!");
