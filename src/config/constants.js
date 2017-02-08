import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.BASE_URL;
const HOME_PAGE = process.env.HOME_PAGE;

export { BASE_URL, HOME_PAGE };
