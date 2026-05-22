async function testArtistSearch() {
  const url = `https://itunes.apple.com/search?term=Bad%20Bunny&entity=musicArtist`;
  console.log(`URL: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Results: ${data.results.length}`);
    data.results.forEach((r, i) => {
      console.log(`${i+1}: Name: "${r.artistName}" | ID: ${r.artistId} | Link: ${r.artistLinkUrl}`);
    });
  } catch (e) {
    console.error(e);
  }
}
testArtistSearch();
