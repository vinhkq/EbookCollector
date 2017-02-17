import axios from 'axios';
import cheerio from 'cheerio';

export default function getLink(downloadInfo) {
  downloadInfo.forEach((download) => {
    const rawLink = download.link;
    const storageLink = rawLink.substring(rawLink.indexOf('http://www'));
    axios.get(storageLink)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const downloadLink = $('#dlbutton').attr('href');
      console.info(downloadLink);
    }).catch((error) => {
      console.log(error);
    });
  });
}
