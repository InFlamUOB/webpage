async function testAlbum() {
  const url = `https://itunes.apple.com/search?term=Un%20Verano%20Sin%20Ti&entity=song&limit=50&explicit=Yes`;
  console.log(`URL: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Results: ${data.results.length}`);
    data.results.forEach((r, i) => {
      console.log(`${i+1}: "${r.trackName}" by "${r.artistName}" [Album: "${r.collectionName}"]`);
    });
  } catch (e) {
    console.error(e);
  }
}
testAlbum();
