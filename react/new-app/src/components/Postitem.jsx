import React from "react";

export function Postitem(props) {
  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btn">
        <button>Удалить</button>
      </div>
    </div>
  );
}
