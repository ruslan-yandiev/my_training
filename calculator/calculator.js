"use strict";

const shows = document.querySelector(".show");
let arr = ["", "", ""];
let count = 0;

document.querySelector(".interface").addEventListener("click", (event) => {
    const buttonContent = event.target.textContent;
    
    if (buttonContent === "C") {
      arr[0] = '';
      arr[1] = '';
      arr[2] = '';
      count = 0;
      show("");
      return;
    }


    if (buttonContent !== "=" && buttonContent.length === 1 && event.target.className === "button") {
      setColor(event);
      show(buttonContent);

      if (buttonContent === "*" || buttonContent === "/" || buttonContent === "+" || buttonContent === "-") {
        if (arr[2]) { arr[1] = ''; }
        arr[2] = buttonContent;
        count = 1;
      } else if (buttonContent !== "*" || buttonContent !== "/" || buttonContent !== "+" || buttonContent !== "-") {
        arr[count] = arr[count] + buttonContent;
      }
    }

    if (buttonContent === "=") {
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

async function setColor(event) {

  event.target.className = "button click_buttom";

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(event.target.className = "button"), 800);
  });

  return await promise;
}