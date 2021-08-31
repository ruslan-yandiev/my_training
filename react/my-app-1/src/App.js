import React, { useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import "./styles/App.css"; // Импортируем наши стили

function App() {
  const [likes, setLikes] = useState(5);
  const [value, setValue] = useState("Текст в Инпуте");

  return (
    <div className="App">
      <div className="post">
        <div className="post__content">
          <strong>1. Javascript</strong>
          <div>Javascript - язык программирования</div>
        </div>

        <div className="post__btns">
          <button>Delete</button>
        </div>
      </div>
      <Counter />
      <Counter />
      <ClassCounter />
      <ClassCounter />
    </div>
  );
}

export default App;
