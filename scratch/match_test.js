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
if (!databaseMatch) {
  console.error("Could not find SONGS_DATABASE in app.js");
  process.exit(1);
}

// Safely parse database using eval since it has JavaScript objects/comments
let SONGS_DATABASE;
eval(`SONGS_DATABASE = ${databaseMatch[1]}`);
console.log(`Loaded ${SONGS_DATABASE.length} songs from database.`);

async function matchTracks() {
  const url = `https://itunes.apple.com/lookup?id=1126808565&entity=song&limit=200&explicit=Yes`;
  console.log(`Querying artist lookup...`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Fetched ${data.results.length} results from iTunes lookup.`);
    
    const lookupTracks = data.results.filter(r => r.wrapperType === 'track');
    console.log(`Found ${lookupTracks.length} song tracks.`);

    let matchedCount = 0;
    const unmatched = [];

    SONGS_DATABASE.forEach(song => {
      const cleanDBTitle = cleanSongTitle(song.title);
      const normDBTitle = normalizeText(cleanDBTitle);
      const normDBAlbum = normalizeText(song.album);

      // Score candidates
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

      if (bestMatch && bestScore > 0) {
        matchedCount++;
        console.log(`✅ MATCHED: "${song.title}" -> "${bestMatch.trackName}" [Album: "${bestMatch.collectionName}"] (Score: ${bestScore})`);
      } else {
        unmatched.push(song);
        console.log(`❌ UNMATCHED: "${song.title}" [Album: "${song.album}"] (Best candidate: ${bestMatch ? bestMatch.trackName : 'none'}, Score: ${bestScore})`);
      }
    });

    console.log(`\nMatch rate: ${matchedCount}/${SONGS_DATABASE.length}`);
    if (unmatched.length > 0) {
      console.log(`Unmatched songs:`, unmatched.map(s => s.title));
    }
  } catch (err) {
    console.error(err);
  }
}

matchTracks();
