async function testArtistLookup() {
  const url = `https://itunes.apple.com/lookup?id=1126808565&entity=song&limit=200&explicit=Yes`;
  console.log(`Artist Lookup URL: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Results: ${data.results.length}`);
    data.results.forEach((r, i) => {
      if (r.wrapperType === 'track') {
        console.log(`${i}: "${r.trackName}" [Album: "${r.collectionName}"] [Preview: ${r.previewUrl}]`);
      }
    });
  } catch (e) {
    console.error(e);
  }
}
testArtistLookup();
