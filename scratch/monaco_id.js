async function getMonacoCollectionId() {
  const url = `https://itunes.apple.com/lookup?id=1126808565&entity=song&limit=200&explicit=Yes&country=US`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const monaco = data.results.find(r => r.trackName && r.trackName.toLowerCase() === 'monaco');
    if (monaco) {
      console.log(`MONACO: trackId=${monaco.trackId}, collectionId=${monaco.collectionId}, collectionName=${monaco.collectionName}`);
    } else {
      console.log("MONACO not found in top 200.");
    }
  } catch (e) {
    console.error(e);
  }
}
getMonacoCollectionId();
