const unmatched = [
  "Diles Bad Bunny Ozuna",
  "Abreme Paso Hector Lavoe"
];

async function searchUnmatched() {
  for (const title of unmatched) {
    const query = encodeURIComponent(title);
    const url = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=15&explicit=Yes&country=US`;
    console.log(`\nSearching for: "${title}"`);
    try {
      const res = await fetch(url);
      const data = await res.json();
      data.results.slice(0, 3).forEach((r, i) => {
        console.log(`  ${i+1}: "${r.trackName}" by ${r.artistName} [Preview: ${r.previewUrl}]`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
searchUnmatched();
