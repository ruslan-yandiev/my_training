// предварительно установив эту библиотеку в бандл(package.json) командой: npm i(элиас: install) --save lodash Или сделать это вручную добавив в бандл(package.json) и команду в консоли npm install
// библиотека lodash содержит много полезных вспомогательных функций (изучить ее)
// import * as _ from 'lodash'; // (* as) - означает, что мы импортируем обсолютно всё

import * as $ from 'jquery';

//* { Cat } осзначает, что мы импортируем конкреиную переменную по ее имени. А если просто Cat то это мы пытаемся получить какоето дефолтное значение, а дефолтного значения у нас там нет
import { Cat } from '@/javascript/cat.js';

// ! импортируем стили после установки пакета и подключения Лоудеров для webpack
import '@/styles/style.scss';

// ! импортируем файлы после установки пакета и подключения Лоудеров для webpack
import CatImage from '@img/cat.jpg';

import json from '@/assets/myjson.json';

console.log('JSON:', json);
$('pre').addClass('code').html(JSON.stringify(json, null, 2));

const cat = new Cat(CatImage);

const container = document.querySelector('.content-container');

cat.render(container);
