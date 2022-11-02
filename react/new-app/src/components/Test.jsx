import React, { useState } from "react";

function Test({ test }) {
  const [text, setText] = useState("Какойто Текст");
  const { title, id, info, body } = test;

  return (
    <div>
      <h1>{title}</h1>
      <div>
        {id}. {info}
      </div>
      <div>{body.map((el, index) => el + index)}</div>
      <br />
      <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
      <br />
      <div>{text}</div>
    </div>
  );
}

export default Test;
