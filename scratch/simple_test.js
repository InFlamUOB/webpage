async function testSimple(storefront) {
  const url = `https://itunes.apple.com/search?term=Bad+Bunny+Yonaguni&entity=song&country=${storefront}&limit=50`;
  console.log(`URL (${storefront}): ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Results: ${data.results.length}`);
    data.results.slice(0, 10).forEach((r, i) => {
      console.log(`${i+1}: "${r.trackName}" by "${r.artistName}" [Album: "${r.collectionName}"]`);
    });
  } catch (e) {
    console.error(e);
  }
}
async function run() {
  await testSimple('ES');
  await testSimple('US');
  await testSimple('PR');
}
run();
