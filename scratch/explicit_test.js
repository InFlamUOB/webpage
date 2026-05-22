

async function testQuery(url) {
  console.log(`Querying: ${url}`);
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(`Results: ${data.results.length}`);
    if (data.results.length > 0) {
      console.log(`First 5 tracks:`, data.results.slice(0, 5).map(r => `${r.trackName} by ${r.artistName}`));
    }
  } catch (err) {
    console.log("Error:", err);
  }
}

async function main() {
  // Test 1: with explicit=Yes (capital Y)
  await testQuery(`https://itunes.apple.com/search?term=Bad%20Bunny%20Yonaguni&media=music&entity=song&limit=5&explicit=Yes`);
  
  // Test 2: without explicit parameter
  await testQuery(`https://itunes.apple.com/search?term=Bad%20Bunny%20Yonaguni&media=music&entity=song&limit=5`);

  // Test 3: with explicit=yes (lowercase)
  await testQuery(`https://itunes.apple.com/search?term=Bad%20Bunny%20Yonaguni&media=music&entity=song&limit=5&explicit=yes`);

  // Test 4: with country=US and explicit=Yes
  await testQuery(`https://itunes.apple.com/search?term=Bad%20Bunny%20Yonaguni&media=music&entity=song&limit=5&explicit=Yes&country=US`);
}

main();
