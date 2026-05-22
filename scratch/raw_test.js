async function testQuery(term) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=50&explicit=Yes`;
  console.log(`\n=== Term: "${term}" ===`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Total results: ${data.results.length}`);
    data.results.slice(0, 15).forEach((r, i) => {
      console.log(`${i+1}: "${r.trackName}" by "${r.artistName}" [Album: "${r.collectionName}"]`);
    });
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  await testQuery("Yonaguni");
  await testQuery("Callaita");
  await testQuery("La Santa");
}
run();
