let divApp = document.querySelector('.app');
let arr = [];
let buttons;

// ====================== GET =============================================

(function () {
    let request = new XMLHttpRequest(); // ! более новый способ с fetch

    request.open('GET', '/api/sever', true);

    request.addEventListener('load', () => {
        let data = JSON.parse(request.response);

        for (let i = 0; i < data.length; i++) {
            let keys = Object.keys(data[i]);
            let values = Object.values(data[i]);
            let accum = '';
            let id = data[i].id;

            for (let j = 0; j < keys.length; j++) {
                if (j === keys.length - 1) {
                    accum += `${keys[j]}: ${values[j]}`;
                } else {
                    accum += `${keys[j]}: ${values[j]}, `;
                }
            }

            let p = document.createElement('p');
            p.id = `${id}`;
            p.innerText = accum;
            arr.push(p);
            divApp.appendChild(p);
            let button = document.createElement('button');
            button.className = `${id} delete`;
            button.textContent = 'Удалить';
            divApp.appendChild(button);

            button.addEventListener('click', () => {
                requestDelete(p.id);
                p.remove(p);
                button.remove();
            });
        }
    });

    request.send();
})();

// =============================== POST ===============================================
document.getElementById('submit-2').addEventListener('click', function (e) {
    e.preventDefault(); // отменим стандартное поведение отправки формы

    // получаем данные формы
    let postNewData = document.forms['postNewData'];
    let text = postNewData.elements['newData'].value;

    // сериализуем данные в json
    let user = JSON.stringify({
        text: text,
    });

    let request = new XMLHttpRequest(); // ! более новый способ с fetch

    // // посылаем запрос на адрес "/"
    request.open('POST', '/api/sever', true); // true (асинхронный), false (синхронный)
    request.setRequestHeader('Content-Type', 'application/json');

    // ! все это сделано, ради того, чтобы навесить обработчик события(загрузки данных ответа с сервера на наш запрос) на объект запроса, когда придет ответ с сервера
    request.addEventListener('load', function () {
        // получаем и парсим ответ сервера
        let textData = JSON.parse(request.response);
        let id = textData.id;

        let p = document.createElement('p');
        p.id = `${id}`;
        p.innerText = `id: ${textData.id}, text:${textData.text}`; // добавим наш ответ в созданный тег параграфа в качестве текста. innerHtml как вариант, чтобы добавить текст или сразу текст с html
        arr.push(p);
        divApp.appendChild(p); // ! без перезагрузки страницы добавим параграф с ответом на нашу страницу
        let button = document.createElement('button');
        button.className = `${id} delete`;
        button.textContent = 'Удалить';
        divApp.appendChild(button);

        button.addEventListener('click', () => {
            requestDelete(p.id);
            p.remove(p);
            button.remove();
        });
    });

    //! отправляем наши сформированные данные с указанными настройками
    // отправку укажем в самом конце, перед навешиванием обработчика событий, чтобы гарантированно успеть реализовать код обработки событий (чтобы не получилось, что ответ пришол быстрее, чем навешали обработку события)
    request.send(user);
});

// =============================== DELETE ===============================================
function requestDelete(id) {
    let request = new XMLHttpRequest();

    request.open('DELETE', `/api/sever/${id}`, true);

    let user = JSON.stringify({
        id: id,
    });

    request.addEventListener('load', () => {
        let data = JSON.parse(request.response);
        console.log(data.message);
    });

    request.send(user);
}
