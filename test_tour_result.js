const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('response', async response => {
    if (response.url().includes('tournament_results') && response.status() >= 400) {
      console.log('TOUR RESULTS ERROR:', await response.text());
    }
  });
  await page.goto('https://copaconejo.vercel.app');
  await page.waitForSelector('#btn-mode-survivor');
  await page.click('#btn-mode-survivor');
  
  // Click 28 times to finish
  for (let i = 0; i < 28; i++) {
    await new Promise(r => setTimeout(r, 800));
    const btn = await page.$('#card-left .btn-vote');
    if (btn) await btn.click();
  }
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
