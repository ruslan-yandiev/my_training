const autocomBox = document.querySelector(".autocom-box");
const textFild = document.querySelector(".text-fild");
const resultCollection = document.querySelector(".result-collection");
const autocomBoxItem = document.querySelectorAll(".autocom-box__item");

let url = "https://api.github.com/search/repositories";
let id;
let response;
let json;
let keyWord = "?q=";

textFild.addEventListener("keydown", (event) => {
  if (id) clearTimeout(id);
  event.key === "Backspace" ? (keyWord = keyWord.substring(0, keyWord.length - 1)) : (keyWord += event.key);

  try {
    id = setTimeout(async () => {
      for (let i = 0; i < autocomBoxItem.length; i++) {
        autocomBoxItem[i].classList.add("hide");
      }

      if (keyWord !== "?q=") {
        fetch(url + keyWord)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            return json.items?.filter((el, index) => index < 5);
          })
          .then((repCollection) => {
            repCollection?.forEach((el, index) => {
              autocomBoxItem[index].innerHTML = el.name;
              if (autocomBoxItem[index].classList.contains("hide")) {
                autocomBoxItem[index].classList.remove("hide");
              }
            });
            console.log(repCollection);
            console.log(event.key);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 100);
  } catch (err) {
    alert("Ошибка HTTP: " + err.status);
  }
});

// {}.name
// {}.owner.login
// {}.stargazers_count
