/*
   * this function will web scrap and get a few images from dribble.com for ai to process and know about the design trends.
*/

const puppeteer = require("puppeteer");

const getInspirationalImages = async (prompt, noOfImages = 5, resize = '1280x720') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const searchTerm = prompt.replace(/ /g, '-');
  const searchURL = `https://dribbble.com/search/${searchTerm}`;
  await page.goto(searchURL, { waitUntil: 'networkidle2' });

  const imageUrls = await page.evaluate((noOfImages, resize) => {
    const images = Array.from(document.querySelectorAll('.shot-thumbnail-base img'));
    return images
      .slice(0, noOfImages)
      .map(img => {
        const src = img.src;
        if (src.startsWith('data:')) {
          return null;
        }
        const url = new URL(src);
        const pathParts = url.pathname.split('/');
        const filename = pathParts.pop();
        const path = pathParts.join('/');
        const resizedUrl = `${url.protocol}//${url.host}${path}/${filename}?resize=${resize}`;
        return resizedUrl;
      })
      .filter(url => url !== null); 
  }, noOfImages, resize);

  await browser.close();
  return imageUrls;
};

module.exports = { getInspirationalImages };