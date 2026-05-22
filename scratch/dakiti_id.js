async function getDakitiCollectionId() {
  const url = `https://itunes.apple.com/lookup?id=1126808565&entity=song&limit=200&explicit=Yes&country=US`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const dakiti = data.results.find(r => r.trackName && r.trackName.toLowerCase().includes('dakiti'));
    if (dakiti) {
      console.log(`DAKITI: trackId=${dakiti.trackId}, collectionId=${dakiti.collectionId}, collectionName=${dakiti.collectionName}`);
    } else {
      console.log("DAKITI not found in top 200.");
    }
  } catch (e) {
    console.error(e);
  }
}
getDakitiCollectionId();
