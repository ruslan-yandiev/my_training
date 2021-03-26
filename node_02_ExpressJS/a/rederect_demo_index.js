const myFirstClass = document.querySelector('.my-div');
myFirstClass.innerHTML = '<h2>He MAN!!!!</h2>';

let request = new XMLHttpRequest(); // ! более новый способ с fetch

request.open('GET', '/a/rederect_demo', true);

request.addEventListener('load', () => {
    const p = document.createElement('p');
    p.innerText = request.response;
    document.querySelector('.my-div').appendChild(p);
});

request.send();
