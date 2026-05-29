const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('response', async response => {
    if (response.url().includes('trivia_results') && response.status() >= 400) {
      console.log('TRIVIA RESULTS ERROR:', await response.text());
    }
  });
  await page.goto('https://copaconejo.vercel.app');
  await page.waitForSelector('#btn-mode-quiz');
  await page.click('#btn-mode-quiz');
  
  // Click 10 times to finish
  for (let i = 0; i < 10; i++) {
    await new Promise(r => setTimeout(r, 500));
    const btn = await page.$('.quiz-option-btn');
    if (btn) await btn.click();
  }
  
  await new Promise(r => setTimeout(r, 2000));
  await browser.close();
})();
