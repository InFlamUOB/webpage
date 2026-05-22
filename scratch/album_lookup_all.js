async function testLookup(id, name) {
  const url = `https://itunes.apple.com/lookup?id=${id}&entity=song&limit=50&explicit=Yes&country=US`;
  console.log(`\n=== Album: "${name}" (ID: ${id}) ===`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Tracks found: ${data.results.length}`);
    data.results.forEach((r, i) => {
      if (r.wrapperType === 'track') {
        console.log(`  ${i}: "${r.trackName}" [Preview: ${r.previewUrl}] [ID: ${r.trackId}]`);
      }
    });
  } catch (e) {
    console.error(e);
  }
}

async function run() {
  await testLookup(1622045443, "Un Verano Sin Ti");
  await testLookup(1711256524, "nadie sabe lo que va a pasar mañana");
  await testLookup(1541763124, "EL ÚLTIMO TOUR DEL MUNDO");
}
run();
