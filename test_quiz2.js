const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('response', async response => {
    if (response.url().includes('trivia_answers') && response.status() === 400) {
      console.log('400 ERROR:', await response.text());
    }
  });
  await page.goto('https://copaconejo.vercel.app');
  await page.waitForSelector('#btn-mode-quiz');
  await page.click('#btn-mode-quiz');
  await new Promise(r => setTimeout(r, 1000));
  const btn = await page.$('.quiz-option-btn');
  if (btn) await btn.click();
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
