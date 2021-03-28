// ! Можем изолировать таким образом нашу логику маршрутов:

import { Router } from 'express'; // const router = require('express').Router();
const router = Router();

import { getAll, create } from '../controllers/servers.js'; // импортируем наши функции колбеки из контроллеров

router.get('/api/sever', getAll);
router.post('/api/sever', create);

export default router;
