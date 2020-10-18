"use strict";

const shows = document.querySelector(".show");
let arr = ["", "", ""];
let count = 0;

document.querySelector(".interface").addEventListener("click", (event) => {
    const target = event.target.textContent;

    if (target === "C") {
      arr[0] = '';
      arr[1] = '';
      arr[2] = '';
      count = 0;
      show("");
      return;
    }

    if (target !== "=" && target.length === 1) {
      show(target);

      if (target === "*" || target === "/" || target === "+" || target === "-") {
        if (arr[2]) { arr[1] = ''; }
        arr[2] = target;
        count = 1;
      } else if (target !== "*" || target !== "/" || target !== "+" || target !== "-") {
        arr[count] = arr[count] + target;
      }
    }

    if (target === "=") {
      myMoth(+arr[0], +arr[1], arr[2]);
    }
  });

function show(arg) {
  if (arg === "") {
    shows.textContent = "";
  } else {
    shows.textContent = shows.textContent + arg;
  }
}

function myMoth(number1, number2, operator) {
  let result = 0;

  if (operator === "+") {
    result = number1 + number2;
  }
  if (operator === "-") {
    result = number1 - number2;
  }
  if (operator === "*") {
    result = number1 * number2;
  }
  if (operator === "/") {
    result = number1 / number2;
  }

  arr[0] = result;
  show("");
  show(result);
}