const fs = require('fs');

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanSongTitle(title) {
  return title
    .replace(/\s*\(feat\..*?\)/gi, "")
    .replace(/\s*\(with.*?\)/gi, "")
    .replace(/\s*\(.*?\)/g, "")
    .replace(/\s*feat\..*/gi, "")
    .trim();
}

// Read database from app.js
const appJsContent = fs.readFileSync('/Users/l.bravo@bham.ac.uk/.gemini/antigravity/scratch/bad-bunny-mashup/app.js', 'utf8');
const databaseMatch = appJsContent.match(/const SONGS_DATABASE = (\[[\s\S]*?\]);/);
let SONGS_DATABASE;
eval(`SONGS_DATABASE = ${databaseMatch[1]}`);

async function testStorefront(country) {
  const url = `https://itunes.apple.com/lookup?id=1126808565&entity=song&limit=200&explicit=Yes&country=${country}`;
  console.log(`\n=== Testing Storefront: ${country} ===`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Fetched ${data.results.length} results.`);
    const lookupTracks = data.results.filter(r => r.wrapperType === 'track');
    console.log(`Tracks: ${lookupTracks.length}`);

    const unmatched = [];
    SONGS_DATABASE.forEach(song => {
      const cleanDBTitle = cleanSongTitle(song.title);
      const normDBTitle = normalizeText(cleanDBTitle);
      const normDBAlbum = normalizeText(song.album);

      let bestMatch = null;
      let bestScore = -999;

      lookupTracks.forEach(track => {
        const cleanTrackTitle = cleanSongTitle(track.trackName || "");
        const normTrackTitle = normalizeText(cleanTrackTitle);
        const normTrackAlbum = normalizeText(track.collectionName || "");

        let score = 0;
        if (normTrackTitle === normDBTitle) {
          score += 150;
        } else if (normTrackTitle.includes(normDBTitle) || normDBTitle.includes(normTrackTitle)) {
          score += 40;
        } else {
          score -= 300;
        }

        if (normDBAlbum && normTrackAlbum) {
          if (normTrackAlbum.includes(normDBAlbum) || normDBAlbum.includes(normTrackAlbum)) {
            score += 60;
          }
        }

        if (score > bestScore) {
          bestScore = score;
          bestMatch = track;
        }
      });

      if (!bestMatch || bestScore <= 0) {
        unmatched.push(song.title);
      }
    });

    console.log(`Matched: ${SONGS_DATABASE.length - unmatched.length}/${SONGS_DATABASE.length}`);
    console.log(`Unmatched:`, unmatched);
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  await testStorefront('ES');
  await testStorefront('MX');
  await testStorefront('US');
}
run();
