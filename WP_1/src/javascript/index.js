// предварительно установив эту библиотеку в бандл(package.json) командой: npm i(элиас: install) --save lodash Или сделать это вручную добавив в бандл(package.json) и команду в консоли npm install
// библиотека lodash содержит много полезных вспомогательных функций (изучить ее)
// import * as _ from 'lodash';

//* { Cat } осзначает, что мы импортируем конкреиную переменную по ее имени. А если просто Cat то это мы пытаемся получить какоето дефолтное значение, а дефолтного значения у нас там нет
import { Cat } from './cat';

// ! импортируем стили после установки пакета и подключения Лоудеров для webpack
import '../styles/style.scss';

// ! импортируем файлы после установки пакета и подключения Лоудеров для webpack
import CatImage from '../img/cat.jpg';

const cat = new Cat(CatImage);

const container = document.querySelector('.content-container');

cat.render(container);
