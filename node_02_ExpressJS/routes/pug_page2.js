// ! Можем изолировать таким образом нашу логику маршрутов:

import { Router } from 'express'; // const router = require('express').Router();
const router = Router();

import { getAll } from '../controllers/pug_page2.js'; // импортируем наши функции колбеки из контроллеров

router.get('/pug_page2', getAll);

export default router;
