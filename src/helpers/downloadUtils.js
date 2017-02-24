import axios from 'axios';
import cheerio from 'cheerio';

export default function getLink(downloadInfo) {
  const formattedDownload = Object.assign({}, downloadInfo);
  downloadInfo.forEach((download, index) => {
    const storageLink = download.link.substr(download.link.indexOf('http://www'));
    const sitePart = storageLink.substring(
      storageLink.indexOf('http://www'),
      storageLink.indexOf('.com/'));
    axios.get(storageLink)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const arrScript = $('#dlbutton').next().text().split(';');
      const aVariable = Math.floor(parseInt(arrScript[0].replace(/[^\d.]/g, ''), 10) / 3);
      const bVariable = parseInt(arrScript[1].replace(/[^\d.]/g, ''), 10);
      const cVariable = parseInt(arrScript[0].replace(/[^\d.]/g, ''), 10);
      const arrURL = arrScript[5]
        .substr(arrScript[5].indexOf('"/d/'), arrScript[5].indexOf('rar"')).split('+');

      const urlPart1 = arrURL[0].replace('"', '').slice(0, -1);
      const urlPart2 = aVariable + (cVariable % bVariable);
      const urlPart3 = arrURL[3].replace('"', '').slice(0, -1);
      const formattedURL = `${sitePart}.com${urlPart1}${urlPart2}${urlPart3}`;

      formattedDownload[index].link = formattedURL;
      console.log(formattedURL);
    }).catch((error) => {
      console.log(error);
    });
  });

  return formattedDownload;
}
