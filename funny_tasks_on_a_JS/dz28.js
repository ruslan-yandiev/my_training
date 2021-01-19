/*
Кто убийца?

Мы - следователи. Нам удалось сузить список подозреваемых до небольшого числа
людей. К счастью, у нас есть информация о том, кто с кем встречался.

Дан список имен подозреваемых и всех, с кем подозреваемые встречались в этот день.

{
  'James': ['Jacob', 'Bill', 'Lucas'],
  'Johnny': ['David', 'Kyle', 'Lucas'],
  'Peter': ['Lucy', 'Kyle'],
}

А также список убитых:

['Lucas', 'Bill']

Найдите имя убийцы. В нашем случае это James, так как он единственный, кто видел
Lucas и Bill.
*/

function killer(suspectInfo, dead) {
    let detect = dead.length;

    for (key in suspectInfo) {
        for (elem of dead) {
            if (suspectInfo[key].includes(elem)) detect -= 1;
        }
        if (detect === 0) return key;
        detect = dead.length;
    }
}

console.log(killer({
  'James': ['Jacob', 'Bill', 'Lucas'],
  'Johnny': ['David', 'Kyle', 'Lucas'],
  'Peter': ['Lucy', 'Kyle']
}, ['Lucas', 'Bill'])); // 'James'

console.log(killer({
  'Brad': [],
  'Megan': ['Ben', 'Kevin'],
  'Finn': []
}, ['Ben'])); // 'Megan'

// * ===========================================================================
/**
 * ! Прислал Dead__ Angel_ (задача с реального собеседования)
 *
 * Function thirdFunction
 * @param {string[]} routes - Samantha's plane tickets.
 *
 * Samantha travels a lot by different cities and countries.
 * She found a group of all plane tickets in her shelf, but she
 * can't exactly remember the order of the cities she visited.
 *
 * Create a function that receives an array of origin-destination tickets
 * and return the entire trip, ordered by city visited.
 */
function rememberTheOrderOfVisitedCity(routes) {
    // Получим набор уникальных мест поссещения
    let allWay = [...new Set(routes.flat(Infinity))];

    // инициализируем схлопнутый массив и две пустые переменные
    let arr = routes.flat(Infinity), start, end;
    let way = [];

    function find(elem, index) {
        let detect = 0;

        for (let i = 0; i < arr.length; i++) if (elem === arr[i]) detect += 1;

        if (detect === 1) arr.indexOf(elem) % 2 === 0 ? start = elem : end = elem;
        
        return index === arr.length ? 'Я Шикарен!' : find(arr[index], index + 1);
    }

    // Найдем начало и конец пути
    find(arr[0], 1);

    // Построим цепочку последовательности перелетов
    while (way.length < allWay.length - 1) {
        for (let i = 0;  i < routes.length;  i++) {
            if (routes[i][0] === start) {
                way.push(start);
                start = routes[i][1];
            }
        }
    }
    // Добавим конечную точку пути
    way.push(end);

    return way.join(',');
}

console.log(rememberTheOrderOfVisitedCity([
  ["MNL", "TAG"], // 1
  ["CEB", "TAC"], // 3
  ["TAG", "CEB"], // 2
  ["TAC", "BOR"], // 4
])); // "MNL, TAG, CEB, TAC, BOR"

console.log(rememberTheOrderOfVisitedCity([
  ["Chicago", "Winnipeg"], // 4
  ["Halifax", "Montreal"], // 1
  ["Montreal", "Toronto"], // 2
  ["Toronto", "Chicago"],  // 3
  ["Winnipeg", "Seattle"], // 5
])); // "Halifax, Montreal, Toronto, Chicago, Winnipeg, Seattle"

console.log(rememberTheOrderOfVisitedCity([
  ["USA","BRA"], // 1
  ["JPN","PHL"], // 4
  ["BRA","UAE"], // 2
  ["UAE","JPN"], // 3
])); // "USA, BRA, UAE, JPN, PHL"

// ! Усложненный вариант (С РЕАЛЬНОГО СОБЕСЕДОВАНИЯ)
/**
 * Прислал Dead__ Angel_ (задача с реального собеседования)
 *
 * Function rememberTheOrderOfVisitedCity
 * @param {string[][]} routes - Samantha's plane tickets.
 *
 * Саманта много путешествует по городам и странам.
 * На своей полке она нашла все сохраненные билеты на самолет с путешествия,
 * но она не может точно вспомнить порядок посещенных городов и не уверена
 * что все билеты ею были сохранены.
 *
 * Создайте функцию, которая получает массив билетов, где записаны места
 * отправления и назначения. Функция должна вернуть массив строк, в которых
 * записаны все возможные маршруты Саманты. Маршрут должен содержать все
 * найденные билеты. Если билетов недостаточно для составления полного маршрута
 * (не задействованы все билеты), то необходимо вернуть пустой массив.
 */
function rememberTheOrderOfVisitedCity2(routes) {
    if (routes.length === 1) return routes[0];

    let copyRoutes = [...routes], step = 0;
    const way = new Set(), pointCollection = [], starts = [];

    // Находим все точки старта.
    for (let i = 0; i < copyRoutes.length; i++) starts.push({ point: copyRoutes[i][0], index: i });

    // Соберем в коллекцию все повторяющиеся точки старта
    for (obj of starts) {
        let points = starts.filter(elem => elem.point === obj.point);

        if (points.length > 1 && !pointCollection.includes(...points)) pointCollection.push(...points);
    }

    pointCollection.reverse(); // просто костыль для корректной работы кода. Лень править )))

    // ! Как вариант можно реалтзовать, чтобы отмечались все посещенные точки!!!!!!!!!!!!!!!!
    function createWay(obj) {
        function f(obj2, obj3, str = '') {
            let point = obj.point;
            copyRoutes = [...routes];
            
            for (let i = obj.index;  i < copyRoutes.length;  i++) {
                if (copyRoutes[i] && copyRoutes[i][0] === point) {
                    str += `${point}, `;
                    point = copyRoutes[i][1];
                    delete copyRoutes[i];

                    if (obj2 !== undefined && point === obj2.point && step === i) {
                        i = obj2.index - 1;
                        obj2 = undefined;
                    } else if (obj3 && point === obj3.point) {
                        i = obj3.index - 1;
                        obj3 = undefined;
                    } else i = -1;
                }
            }
            
            str += `${point}`;

            str.split(',').length < routes.length + 1 ? str = '' : way.add(str);
        }

        f();

        if (pointCollection.length === 2) for (let i = 0; i < pointCollection.length; i++) f(pointCollection[i]);
        
        if (pointCollection.length > 2) for (let i = 0; i < pointCollection.length; i++) {
            for (let j = 2; j < pointCollection.length; j++) f(pointCollection[i], pointCollection[j]);
        }

        step += 1;
    }

    for (obj of starts) {
        step = 0;
        for (let i = 0; i < routes.length; i++) createWay(obj);
    }
    
    return [...way];
}

console.log(
  rememberTheOrderOfVisitedCity2([
    ['USA', 'UKR'], // 5 // 2
    ['RUS', 'BLR'], // 1 // 4
    ['BLR', 'UKR'], // 2 // 5
    ['RUS', 'USA'], // 4 // 1
    ['UKR', 'RUS'], // 3 // 3
  ])
); // ["RUS, BLR, UKR, RUS, USA, UKR", "RUS, USA, UKR, RUS, BLR, UKR"]

console.log(
  rememberTheOrderOfVisitedCity2([
    ["USA", "BRA"], // 1
    ["JPN", "PHL"], // 4
    ["BRA", "UAE"], // 2
    ["UAE", "JPN"], // 3
  ])
); // ["USA, BRA, UAE, JPN, PHL"]

console.log(
  rememberTheOrderOfVisitedCity2([
    ['A', 'B'],
    ['B', 'C'],
    ['D', 'E'],
    ['B', 'A'],
  ])
); // []

console.log(
  rememberTheOrderOfVisitedCity2([
    ["D", "E"],
    ["C", "C"],
    ["B", "A"]
  ])
); // []

console.log(
  rememberTheOrderOfVisitedCity2([
    ["D", "E"],
    ["B", "A"],
    ["B", "A"]
  ])
); // []

console.log(
  rememberTheOrderOfVisitedCity2([
    ["A", "B"],
    ["B", "C"],
    ["B", "A"]
  ])
); // ["B, A, B, C"]

console.log(
  rememberTheOrderOfVisitedCity2([
    ["A", "B"],
    ["B", "C"],
    ["E", "C"],
    ["B", "E"],
    ["C", "B"]
  ])
); // ["A, B, C, B, E, C", "A, B, E, C, B, C"]

console.log(
  rememberTheOrderOfVisitedCity2([
    ["USA", "BRA"],
    ["JPN", "PHL"],
    ["BRA", "JPN"],
    ["BRA", "UAE"],
    ["UAE", "JPN"]
  ])
); // []

console.log(
  rememberTheOrderOfVisitedCity2([
    ["USA", "BRA"],
    ["PHI", "BRA"],
    ["GOA", "PHI"],
    ["BRA", "GOA"],
    ["JPN", "PHL"],
    ["BRA", "UAE"],
    ["JPN", "ORA"],
    ["ORA", "JPN"],
    ["UAE", "JPN"]
  ])
); // ["USA, BRA, GOA, PHI, BRA, UAE, JPN, ORA, JPN, PHL]

console.log(
  rememberTheOrderOfVisitedCity2([
    ["USA", "BRA"],
    ["JPN", "PHL"],
    ["BRA", "UAE"],
    ["BRA", "GVI"],
    ["BRA", "JPN"],
    ["UAE", "JPN"],
    ["PHL", "BRA"],
    ["JPN", "BRA"]
  ])
);
// [
//   "USA, BRA, UAE, JPN, PHL, BRA, JPN, BRA, GVI"
//   "USA, BRA, UAE, JPN, BRA, JPN, PHL, BRA, GVI"
//   "USA, BRA, JPN, PHL, BRA, UAE, JPN, BRA, GVI"
//   "USA, BRA, JPN, BRA, UAE, JPN, PHL, BRA, GVI"
// ]

console.log(
  rememberTheOrderOfVisitedCity2([
    ["USA", "BRA"],
    ["JPN", "PHL"],
    ["BRA", "UAE"],
    ["UAE", "JPN"],
    ["GOA", "BRA"],
    ["PHI", "GOA"],
    ["ORA", "UAE"]
  ])
); // []

// ? ==================================================================================================
// ? Что такое bind?
// *  bind это специальная функция кторая позволяет привязывать контекст и дополнительные аргументы к заданной
// *  исходной функции. Бинд возвращает новую функцию с уже заданным контекстом. Забинденый контекст сменить уже нельзя, он жостко забинден и второй бинд не удастся!!!
// * Пример:
function sayHi() {
  console.log(`${this} hi`);
}

const bindSayHi = sayHi.bind('Ruslan'); // ! тоесть мы у функции ее контексту this присвоили значение Ruslan, ну или можем присвоить в качестве контекста другой объект
bindSayHi(); // Ruslan hi

// ? 