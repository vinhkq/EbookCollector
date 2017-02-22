import axios from 'axios';
import cheerio from 'cheerio';
import jsdom from 'jsdom';

export default function getLink(downloadInfo) {
  downloadInfo.forEach((download) => {
    const rawLink = download.link;
    const storageLink = rawLink.substring(rawLink.indexOf('http://www'));
    axios.get(storageLink)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const script = $('#dlbutton').next().text();
      jsdom.env(
        response.data,
        [script],
        (err, window) => {
          const $$ = cheerio.load(window.document.documentElement.outerHTML);
          console.log($$('#dlbutton').attr('href'));
          // consider to use phantomjs
        },
      );
    }).catch((error) => {
      console.log(error);
    });
  });
}
