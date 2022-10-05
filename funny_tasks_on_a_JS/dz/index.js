const autocomBox = document.querySelector(".autocom-box");
const textFild = document.querySelector(".text-fild");
const resultCollection = document.querySelector(".result-collection");
const autocomBoxItem = document.querySelectorAll(".autocom-box__item");

let url = "https://api.github.com/search/repositories?q=";
let repCollections;
let id;

// ===========================================================================================================
textFild.addEventListener("input", (event) => {
  if (id) clearTimeout(id);
  send(url + textFild.value);
});
// ===========================================================================================================
autocomBox.addEventListener("click", (event) => {
  let elem = repCollections[event.target.id];
  let resultCollection__item = document.createElement("div");
  resultCollection__item.classList.add("result-collection__item");

  let close = document.createElement("div");
  close.classList.add("close", "result-collection__close");

  let ul = document.createElement("ul");
  ul.classList.add("list", "result-collection__element");

  let li = document.createElement("li");
  li.classList.add("list__item");
  li.innerHTML = `Name: ${elem.name}`;
  ul.append(li);
  li = document.createElement("li");
  li.classList.add("list__item");
  li.innerHTML = `Owner: ${elem.owner.login}`;
  ul.append(li);
  li = document.createElement("li");
  li.classList.add("list__item");
  li.innerHTML = `Stars: ${elem.stargazers_count}`;
  ul.append(li);
  resultCollection__item.append(ul);
  resultCollection__item.append(close);
  resultCollection.append(resultCollection__item);

  textFild.value = "";
  cleaning();
});
// ===========================================================================================================
resultCollection.addEventListener("click", (event) => {
  if (event.target.classList.contains("close")) {
    event.target.parentElement.remove();
  }
});
// ===========================================================================================================
function cleaning() {
  for (let i = 0; i < autocomBoxItem.length; i++) {
    autocomBoxItem[i].classList.add("hide");
  }
}

function send(fullURL) {
  try {
    id = setTimeout(async () => {
      cleaning();

      if (fullURL !== url) {
        fetch(fullURL)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            return json.items?.filter((el, index) => index < 5);
          })
          .then((repCollection) => {
            repCollection?.forEach((el, index) => {
              autocomBoxItem[index].innerHTML = el.name;
              autocomBoxItem[index].id = index;
              if (autocomBoxItem[index].classList.contains("hide")) {
                autocomBoxItem[index].classList.remove("hide");
              }
            });
            repCollections = repCollection;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }, 300);
  } catch (err) {
    alert("Ошибка HTTP: " + err.status);
  }
}
