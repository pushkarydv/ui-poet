/*
    * this function takes a URL of image file and returns a generative part object with the file data encoded in base64.
*/

const https = require('https');
const mime = require('mime-types');
const url = require('url');

async function fileToGenerativePart(urlString) {
  const parsedUrl = url.parse(urlString);
  const extension = parsedUrl.pathname.split('.').pop();
  const mimeType = mime.lookup(extension) || 'application/octet-stream';

  return new Promise((resolve, reject) => {
    https.get(urlString, async (res) => {
      try {
        const chunks = [];
        for await (const chunk of res) {
          chunks.push(chunk);
        }

        const buffer = Buffer.concat(chunks);
        const base64Data = buffer.toString('base64');
        resolve({
          inlineData: {
            data: base64Data,
            mimeType,
          },
        });
      } catch (err) {
        reject(err);
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}



module.exports = { fileToGenerativePart };