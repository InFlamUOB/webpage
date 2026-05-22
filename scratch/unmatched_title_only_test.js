const unmatched = [
  { title: "Aguacero", album: "Un Verano Sin Ti" },
  { title: "SEDA", album: "Nadie Sabe Lo Que Va A Pasar Mañana" },
  { title: "VOU7Y", album: "Nadie Sabe Lo Que Va A Pasar Mañana" },
  { title: "BATICANO", album: "Nadie Sabe Lo Que Va A Pasar Mañana" },
  { title: "GRACIAS POR NADA", album: "Nadie Sabe Lo Que Va A Pasar Mañana" },
  { title: "Maldita Pobreza", album: "El Último Tour Del Mundo" }
];

async function searchUnmatched() {
  for (const song of unmatched) {
    const query = encodeURIComponent(song.title);
    const url = `https://itunes.apple.com/search?term=${query}&media=music&entity=song&limit=50&explicit=Yes&country=US`;
    console.log(`\nSearching for: "${song.title}" (${url})`);
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(`Results found: ${data.results.length}`);
      const badBunny = data.results.filter(r => r.artistName && r.artistName.toLowerCase().includes("bad bunny"));
      console.log(`Bad Bunny candidates: ${badBunny.length}`);
      badBunny.forEach((r, i) => {
        console.log(`  ${i+1}: "${r.trackName}" [Album: "${r.collectionName}"] [Preview: ${r.previewUrl}]`);
      });
    } catch (e) {
      console.error(e);
    }
  }
}
searchUnmatched();
