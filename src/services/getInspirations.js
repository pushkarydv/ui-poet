/**
 * This file contains a function that web scrapes and retrieves a few images from dribbble.com.
 * The purpose of this function is to provide design trends for AI to process.
 * 
 * Retrieves a specified number of inspirational images from dribbble.com based on a prompt.
 * 
 * @param {string} prompt - The prompt to search for on dribbble.com.
 * @param {number} [noOfImages=5] - The number of images to retrieve (default is 5).
 * @param {string} [resize='1280x720'] - The desired size of the images (default is '1280x720').
 * @returns {Promise<string[]>} - A promise that resolves to an array of image URLs.
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