import axios from 'axios';
import { BASE_URL, HOME_PAGE } from '../config/constants';
import { indexDOMParser, detailDOMParser } from '../helpers/domUtils';
import getLink from '../helpers/downloadUtils';

const index = (res) => {
  axios.get(BASE_URL + HOME_PAGE)
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
  .then((response) => {
    const item = detailDOMParser(response.data);
    getLink(item.downloadInfo);
    res.render('detail', { title: 'Detail Page!!!', item });
  }).catch((error) => {
    console.log(error);
  });
};

export { index, detail };
