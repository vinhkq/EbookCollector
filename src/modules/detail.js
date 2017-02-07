import axios from 'axios';
import { BASE_URL } from '../config/constants';
import { detailDOMParser } from '../helpers/domUtils';

export default function detail(req, res) {
  const { slug } = req.params;

  axios.get(BASE_URL + slug)
  .then((response) => {
    const item = detailDOMParser(response.data);
    res.render('detail', { title: 'Detail Page!!!', item });
  }).catch((error) => {
    console.log(error);
  });
}
