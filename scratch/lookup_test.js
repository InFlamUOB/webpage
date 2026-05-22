async function testLookup(id, country) {
  const url = `https://itunes.apple.com/lookup?id=${id}&country=${country}`;
  console.log(`Lookup URL (${country}): ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Results: ${data.results.length}`);
    if (data.results.length > 0) {
      const r = data.results[0];
      console.log(`Track: "${r.trackName}" by "${r.artistName}"`);
      console.log(`Preview URL: ${r.previewUrl}`);
    }
  } catch (e) {
    console.error(e);
  }
}
async function run() {
  await testLookup(1622045413, 'US');
  await testLookup(1622045413, 'GB');
}
run();
