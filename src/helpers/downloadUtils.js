import cheerio from 'cheerio';
import phantom from 'phantom';

async function dynamicContent(storageLink) {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.open(storageLink);

  const content = await page.property('content');
  await instance.exit();
  return content;
}

export default async function getLink(downloadInfo) {
  const formattedDownload = Object.assign({}, downloadInfo);
  const downloadLength = Object.keys(formattedDownload).length;
  for (let i = 0; i < downloadLength; i += 1) {
    const download = formattedDownload[i];
    if (download.link) {
      const storageLink = download.link.substr(download.link.indexOf('http://www'));
      const sitePart = storageLink.substring(
        storageLink.indexOf('http://www'),
        storageLink.indexOf('.com/'));
      const $ = cheerio.load(await dynamicContent(storageLink));
      const formattedURL = $('#dlbutton').attr('href');
      formattedDownload[i].link = `${sitePart}.com${formattedURL}`;
    }
  }
  return formattedDownload;
}
