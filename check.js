const puppeteer = require('puppeteer');

const URL = 'https://kuchenabluftreinigung.de';

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  let gaSent = false;
  page.on('request', (req) => {
    if (req.url().includes('G-1S1E9L9PQZ')) {
      gaSent = true;
      console.log('GA zahtev poslat:', req.url().slice(0, 100));
    }
  });

  const start = Date.now();
  const response = await page.goto(URL, { waitUntil: 'networkidle0' });
  const loadMs = Date.now() - start;

  console.log('Status:', response.status());
  console.log('Naslov:', await page.title());
  console.log('Vreme učitavanja:', loadMs, 'ms');
  console.log(gaSent ? 'GA: DA, zahtev je poslat' : 'GA: NE, zahtev nije poslat');

  await browser.close();
})();
