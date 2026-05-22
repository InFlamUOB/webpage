

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

async function testSong(title, album) {
  const cleanTitle = cleanSongTitle(title);
  const query = encodeURIComponent(`Bad Bunny ${cleanTitle}`);
  const url = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=15&explicit=yes&country=US`;
  console.log(`Searching (US storefront): ${url}`);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      console.log(`Raw results count: ${data.results.length}`);
      console.log(`First 3 raw results:`, data.results.slice(0, 3).map(r => ({ trackName: r.trackName, artistName: r.artistName })));
      const normalizedTitle = normalizeText(cleanTitle);
      const badBunnyResults = data.results.filter(r =>
        r.artistName && r.artistName.toLowerCase().includes("bad bunny")
      );
      
      console.log(`Found ${badBunnyResults.length} Bad Bunny results.`);
      
      const scoredResults = badBunnyResults.map(r => {
        const rTrack = r.trackName || "";
        const cleanRTrack = cleanSongTitle(rTrack);
        
        const rAlbum = r.collectionName || "";
        const normalizedRTrack = normalizeText(cleanRTrack);
        const normalizedRAlbum = normalizeText(rAlbum);
        const normalizedAlbum = normalizeText(album);
        const originalIsRemix = normalizedTitle.includes("remix");

        let score = 0;
        let hasTitleMatch = false;

        // 1. Coincidencia de título
        if (normalizedRTrack === normalizedTitle) {
          score += 150;
          hasTitleMatch = true;
        } else if (normalizedRTrack.includes(normalizedTitle) || normalizedTitle.includes(normalizedRTrack)) {
          score += 40;
          hasTitleMatch = true;
        } else {
          score -= 300;
        }

        // 2. Coincidencia de Álbum
        if (normalizedAlbum && normalizedRAlbum) {
          if (normalizedRAlbum.includes(normalizedAlbum) || normalizedAlbum.includes(normalizedRAlbum)) {
            score += 60;
          }
        }

        // 3. Penalizar/Premiar Remixes
        const resultIsRemix = normalizedRTrack.includes("remix");
        if (originalIsRemix && resultIsRemix) {
          score += 50;
        } else if (!originalIsRemix && resultIsRemix) {
          score -= 100;
        }

        // 4. Penalizar covers
        if (normalizedRTrack.includes("cover") || normalizedRTrack.includes("tributo") || normalizedRTrack.includes("tribute") || normalizedRTrack.includes("karaoke")) {
          score -= 120;
        }
        
        return { trackName: r.trackName, score: score, artistName: r.artistName, previewUrl: r.previewUrl };
      });
      
      scoredResults.sort((a, b) => b.score - a.score);
      console.log("Scored results:", scoredResults);
    } else {
      console.log("No results found at all.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

async function main() {
  console.log("--- Testing Yonaguni ---");
  await testSong("Yonaguni", "Single");
  console.log("\n--- Testing Callaita ---");
  await testSong("Callaita", "Single");
  console.log("\n--- Testing La Santa ---");
  await testSong("La Santa (feat. Daddy Yankee)", "YHLQMDLG");
}

main();
