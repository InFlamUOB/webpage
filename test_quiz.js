const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('requestfailed', request => {
    console.log('REQUEST FAILED:', request.url(), request.failure().errorText);
  });
  page.on('response', response => {
    if (response.url().includes('supabase')) {
      console.log('SUPABASE RESPONSE:', response.url(), response.status());
    }
  });
  await page.goto('https://copaconejo.vercel.app');
  await page.waitForSelector('#btn-mode-quiz');
  await page.click('#btn-mode-quiz');
  await new Promise(r => setTimeout(r, 1500));
  for (let i = 0; i < 10; i++) {
    const btn = await page.$('.quiz-option-btn');
    if (btn) await btn.click();
    await new Promise(r => setTimeout(r, 500));
  }
  await new Promise(r => setTimeout(r, 1000));
  await browser.close();
})();
