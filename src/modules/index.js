import axios from 'axios';
import cheerio from 'cheerio';
import { BASE_URL } from '../config/constants';

export default function index (res) {
  axios.get(BASE_URL)
  .then((response) => {

    let $ = cheerio.load(response.data);

    let items = $('.row .book-top').map(() => {
      const rating = $(this).find("meta[itemprop='ratingValue']").attr('content');
      const href = $(this).find('.btn-info').attr('href');
      return { rating, href };
    }).get();

    res.render('index', { title: 'Home Page!!!', items });

  }).catch(function (error) {
    console.log(error);
  });
};