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

async function fetchStorefrontTracks(country) {
  const url = `https://itunes.apple.com/lookup?id=1126808565&entity=song&limit=200&explicit=Yes&country=${country}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results.filter(r => r.wrapperType === 'track');
  } catch (e) {
    console.error(`Error fetching storefront ${country}:`, e);
    return [];
  }
}

async function aggregate() {
  console.log("Fetching tracks from storefronts: US, MX, ES, GB...");
  const usTracks = await fetchStorefrontTracks('US');
  const mxTracks = await fetchStorefrontTracks('MX');
  const esTracks = await fetchStorefrontTracks('ES');
  const gbTracks = await fetchStorefrontTracks('GB');

  // Combine and deduplicate by trackId
  const trackMap = new Map();
  [...usTracks, ...mxTracks, ...esTracks, ...gbTracks].forEach(track => {
    trackMap.set(track.trackId, track);
  });
  const allTracks = Array.from(trackMap.values());
  console.log(`Aggregated ${allTracks.length} unique tracks.`);

  const songsWithPreviews = [];
  const unmatched = [];

  SONGS_DATABASE.forEach(song => {
    const cleanDBTitle = cleanSongTitle(song.title);
    const normDBTitle = normalizeText(cleanDBTitle);
    const normDBAlbum = normalizeText(song.album);

    let bestMatch = null;
    let bestScore = -999;

    allTracks.forEach(track => {
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
      songsWithPreviews.push({
        ...song,
        previewUrl: bestMatch.previewUrl,
        verifiedTrackName: bestMatch.trackName,
        verifiedAlbumName: bestMatch.collectionName
      });
    } else {
      unmatched.push(song);
    }
  });

  console.log(`Matched: ${songsWithPreviews.length}/${SONGS_DATABASE.length}`);
  console.log("Unmatched count:", unmatched.length);
  unmatched.forEach(s => console.log(`- ${s.title} [Album: ${s.album}]`));

  // Write out the result database with URLs
  fs.writeFileSync('scratch/matched_database.json', JSON.stringify(songsWithPreviews, null, 2));
  fs.writeFileSync('scratch/unmatched_database.json', JSON.stringify(unmatched, null, 2));
}

aggregate();
