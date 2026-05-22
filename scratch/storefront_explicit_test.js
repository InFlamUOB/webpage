async function testQuery(term, country) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=50&explicit=Yes&country=${country}`;
  console.log(`\n=== Term: "${term}" (Storefront: ${country}) ===`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Total results: ${data.results.length}`);
    const badBunny = data.results.filter(r => r.artistName && r.artistName.toLowerCase().includes("bad bunny"));
    console.log(`Bad Bunny results: ${badBunny.length}`);
    badBunny.forEach((r, i) => {
      console.log(`  ${i+1}: "${r.trackName}" [Album: "${r.collectionName}"] [ID: ${r.trackId}] [Preview: ${r.previewUrl}]`);
    });
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  await testQuery("Bad Bunny Yonaguni", "US");
  await testQuery("Bad Bunny Callaita", "US");
  await testQuery("Bad Bunny La Santa", "US");
}
run();
