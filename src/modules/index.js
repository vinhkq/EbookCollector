import axios from 'axios';
import { BASE_URL } from '../config/constants';
import { indexDOMParser } from '../helpers/domUtils';

export default function index (res) {
  axios.get(BASE_URL)
  .then((response) => {

    const items = indexDOMParser(response.data);
    res.render('index', { title: 'Home Page!!!', items });

  }).catch(function (error) {
    console.log(error);
  });
};