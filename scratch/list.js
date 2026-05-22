

async function listAllTracks() {
  const url = `https://itunes.apple.com/search?term=Bad%20Bunny&media=music&entity=song&limit=200&explicit=yes`;
  console.log(`Searching all Bad Bunny tracks: ${url}`);
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(`Total results: ${data.results.length}`);
    const trackNames = data.results.map(r => `${r.trackName} [Album: ${r.collectionName}] [Artist: ${r.artistName}]`);
    console.log("Top 100 tracks in search results:");
    console.log(trackNames.slice(0, 100));
  } catch (err) {
    console.error(err);
  }
}

listAllTracks();
