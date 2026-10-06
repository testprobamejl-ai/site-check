const puppeteer = require('puppeteer');

const URL = 'https://kuchenabluftreinigung.de';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  const start = Date.now();
  const response = await page.goto(URL, { waitUntil: 'networkidle0' });
  const loadMs = Date.now() - start;

  console.log('Status:', response.status());
  console.log('Naslov:', await page.title());
  console.log('Vreme učitavanja:', loadMs, 'ms');

  await browser.close();
})();
