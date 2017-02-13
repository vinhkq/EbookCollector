import { Router } from 'express';
import { index, detail } from './../controllers/home';

const route = Router();

/* GET home page. */
route.get('/', (req, res) => index(res));

/* GET detail page. */
route.get('/detail/:slug', (req, res) => detail(req, res));

export default route;
