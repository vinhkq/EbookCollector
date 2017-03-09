import axios from 'axios';
import { BASE_URL, HOME_PAGE } from '../config/constants';
import { indexDOMParser, detailDOMParser } from '../helpers/domUtils';
import getLink from '../helpers/downloadUtils';

const index = (req, res) => {
  let path = `${BASE_URL}${HOME_PAGE}`;
  if (req.params.page) {
    path = `${path}/page/${req.params.page}`;
  }

  axios.get(path)
  .then((response) => {
    const items = indexDOMParser(response.data);

    res.render('index', { title: 'Home Page!!!', items });
  }).catch((error) => {
    console.log(error);
  });
};

const detail = (req, res) => {
  const { slug } = req.params;

  axios.get(BASE_URL + slug)
  .then(async (response) => {
    const item = detailDOMParser(response.data);
    const downloadInfo = await getLink(item.downloadInfo);
    item.downloadInfo = downloadInfo;
    res.render('detail', { title: 'Detail Page!!!', item });
  }).catch((error) => {
    console.log(error);
  });
};

export { index, detail };
