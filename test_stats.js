const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('response', async response => {
    if (response.url().includes('get_global_stats')) {
      const text = await response.text();
      console.log('STATS JSON:', text);
    }
  });
  await page.goto('https://copaconejo.vercel.app');
  await page.waitForSelector('.btn-primary');
  await page.evaluate(() => fetchGlobalStats());
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
