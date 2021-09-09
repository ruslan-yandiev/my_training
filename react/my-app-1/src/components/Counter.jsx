import React, { useState } from "react";

/*
useState - один из стандартных хуков предоставляемых Риактом, для управления состоянием.
?Хуки - это некоторые функции предоставляемые нам Риактом, которые всегда начинаются со слова (use)
?и которые мы можем использовать в Функциональных компонентах или в наших собственных хуках.
*Хуки можно использовать только на вверхнем уровне вложенности функционального компонента или кастомного хука!!! (т.е. мы не можем вкладывать хуки в какие то функции, в условия, в циклы)
*/

const Counter = function () {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function dencrement() {
    setCount(count - 1);
  }

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={dencrement}>Decrement</button>
    </div>
  );
};

export default Counter;
