// async function start() {
//   let url = "https://api.github.com/search/repositories?q=react";
//   let response = await fetch(url);

//   if (response.ok) {
//     let json = await response.json();
//     console.log(json);
//   } else {
//     alert("Ошибка HTTP: " + response.status);
//   }
// }
// start();

const info = document.querySelector(".info");
const textFild = document.querySelector(".text-fild");
let url = "https://api.github.com/search/repositories?q=react";
textFild.addEventListener("keydown", () => {
  let id;

  if (!id) clearTimeout(id);

  id = setTimeout(() => {
    fetch(url)
      .then((response) => {
        response.json().then((json) => {
          console.log(json);
          info.innerHTML += " + + ";
        });
      })
      .catch((err) => {
        alert("Ошибка HTTP: " + err.status);
      });
  }, 800);
});
