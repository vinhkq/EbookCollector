import { Router } from 'express'
import index from './../modules/index'

let route = Router ();

/* GET home page. */
route.get('/', function(req, res, next) {
  res.render('index', { title: index() });
});

/* GET users listing. */
route.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});


export default route;