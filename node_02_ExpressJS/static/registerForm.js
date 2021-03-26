document.getElementById('submit').addEventListener('click', function (e) {
    e.preventDefault(); // отменим стандартное поведение отправки формы

    // получаем данные формы
    let registerForm = document.forms['registerForm'];
    let userName = registerForm.elements['userName'].value;
    let userAge = registerForm.elements['userAge'].value;

    // сериализуем данные в json
    let user = JSON.stringify({
        userName: userName,
        userAge: userAge,
    });

    let request = new XMLHttpRequest(); // ! более новый способ с fetch

    // посылаем запрос на адрес "/"
    request.open('POST', '/', true); // true (асинхронный), false (синхронный)
    request.setRequestHeader('Content-Type', 'application/json');

    // ! все это сделано, ради того, чтобы навесить обработчик события(загрузки данных ответа с сервера на наш запрос) на объект запроса, когда придет ответ с сервера
    request.addEventListener('load', function () {
        // получаем и парсим ответ сервера
        let receivedUser = JSON.parse(request.response);
        console.log(receivedUser.userName, '-', receivedUser.userAge); // смотрим ответ сервера

        const p = document.createElement('p');
        p.innerText = `${receivedUser.userName} -- ${receivedUser.userAge}`; // добавим наш ответ в созданный тег параграфа в качестве текста. innerHtml как вариант, чтобы добавить текст или сразу текст с html
        document.querySelector('.my_first_class').appendChild(p); // ! без перезагрузки страницы добавим параграф с ответом на нашу страницу
    });

    //! отправляем наши сформированные данные с указанными настройками
    // отправку укажем в самом конце, перед навешиванием обработчика событий, чтобы гарантированно успеть реализовать код обработки событий (чтобы не получилось, что ответ пришол быстрее, чем навешали обработку события)
    request.send(user);
});
