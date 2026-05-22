const fs = require('fs');

const appPath = '/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/app.js';
let appJS = fs.readFileSync(appPath, 'utf8');

const dtmfSongs = `
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
  }
`;

// Inject into SONGS_DATABASE
if (!appJS.includes('sp-mudanza')) {
  appJS = appJS.replace('];\n\n// Estado global del torneo', `,\n${dtmfSongs}\n];\n\n// Estado global del torneo`);
}

// Write the modified app.js
fs.writeFileSync(appPath, appJS, 'utf8');
console.log("Successfully appended DTMF songs to app.js");
