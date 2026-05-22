const fs = require('fs');

// Read current matched database
const matched = JSON.parse(fs.readFileSync('scratch/matched_database.json', 'utf8'));

// Verified preview URLs for the 4 Nadie Sabe tracks
const manualPreviews = {
  "seda": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/57/8a/17/578a17d4-3ab9-b379-92ec-5fbfb1c9505c/mzaf_4863485028599427699.plus.aac.p.m4a",
  "vou7y": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/4f/9a/77/4f9a776b-23ce-877f-03e5-966de543859f/mzaf_11944417217944518372.plus.aac.p.m4a",
  "baticano": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/9f/19/86/9f198699-682b-bf70-c79b-abacec44a41e/mzaf_6458569164932360839.plus.aac.p.m4a",
  "gracias-por-nada": "https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/53/2a/cf/532acfbf-bc5d-0cdb-fd0e-21c13e91bb37/mzaf_7342393327582022930.plus.aac.p.m4a"
};

// Read original SONGS_DATABASE from app.js to keep exact same order and structure
const appJsContent = fs.readFileSync('/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/app.js', 'utf8');
const databaseMatch = appJsContent.match(/const SONGS_DATABASE = (\[[\s\S]*?\]);/);
let SONGS_DATABASE;
eval(`SONGS_DATABASE = ${databaseMatch[1]}`);

const finalDatabase = SONGS_DATABASE.map(song => {
  const match = matched.find(m => m.id === song.id);
  let previewUrl = null;
  if (match) {
    previewUrl = match.previewUrl;
  } else if (song.id in manualPreviews) {
    previewUrl = manualPreviews[song.id];
  }

  return {
    ...song,
    previewUrl: previewUrl
  };
});

console.log(`Generated final database of ${finalDatabase.length} tracks.`);
const missing = finalDatabase.filter(s => !s.previewUrl);
console.log(`Missing previews count: ${missing.length}`);
if (missing.length > 0) {
  console.log("Missing songs:", missing.map(m => m.title));
}

fs.writeFileSync('scratch/final_database.json', JSON.stringify(finalDatabase, null, 2));

// Generate the JS code to replace the database in app.js
let jsCode = "const SONGS_DATABASE = [\n";
finalDatabase.forEach((song, i) => {
  jsCode += "  {\n";
  jsCode += `    id: "${song.id}",\n`;
  jsCode += `    title: "${song.title}",\n`;
  jsCode += `    album: "${song.album}",\n`;
  jsCode += `    year: ${song.year},\n`;
  jsCode += `    theme: "${song.theme}",\n`;
  jsCode += `    emoji: "${song.emoji}",\n`;
  jsCode += `    previewUrl: "${song.previewUrl}"\n`;
  jsCode += "  }" + (i < finalDatabase.length - 1 ? "," : "") + "\n";
});
jsCode += "];";

fs.writeFileSync('scratch/database_code.js', jsCode);
console.log("Written database code to scratch/database_code.js");
