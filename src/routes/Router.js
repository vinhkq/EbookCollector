import { Router } from 'express';
import index from './../modules/index';
import detail from './../modules/detail';

let route = Router ();

/* GET home page. */
route.get('/', function(req, res, next) {
  index(res);
});

/* GET detail page. */
route.get('/detail', function(req, res, next) {
  detail(req, res);
});


export default route;