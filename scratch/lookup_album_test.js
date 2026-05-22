async function testLookup(id, country) {
  const url = `https://itunes.apple.com/lookup?id=${id}&entity=song&country=${country}&explicit=Yes`;
  console.log(`Lookup URL (${country}): ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Results: ${data.results.length}`);
    data.results.forEach((r, i) => {
      console.log(`${i+1}: Type: "${r.wrapperType}" | Track: "${r.trackName}" by "${r.artistName}"`);
    });
  } catch (e) {
    console.error(e);
  }
}
async function run() {
  await testLookup(1570535310, 'US');
  await testLookup(1570535310, 'GB');
}
run();
