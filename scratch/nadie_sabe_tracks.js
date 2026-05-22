async function testAlbumTracks() {
  const url = `https://itunes.apple.com/lookup?id=1710982865&entity=song&limit=50&explicit=Yes&country=US`;
  console.log(`Querying: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Tracks: ${data.results.length}`);
    data.results.forEach((r, i) => {
      if (r.wrapperType === 'track') {
        console.log(`  ${i}: "${r.trackName}" [Preview: ${r.previewUrl}] [ID: ${r.trackId}]`);
      }
    });
  } catch (e) {
    console.error(e);
  }
}
testAlbumTracks();
