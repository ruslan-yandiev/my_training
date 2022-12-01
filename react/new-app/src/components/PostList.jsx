// import React from "react";
// import { PostItem } from "./PostItem";

// function PostList({ remove, posts, title }) {
//   if (!posts.length) return <h1 style={{ textAlign: "center", color: "red" }}>Посты не найдены!</h1>

//   return (
//     <div>
//       <h1>{title}</h1>
//       {posts.map((post, index) => <PostItem remove={remove} number={index + 1} post={post} key={post.id} />)}
//     </div>
//   );
// }

import React from 'react';
import { CSSTransition, TransitionGroup} from 'react-transition-group'; // библиотека анимации, добавленная через npm
import { PostItem } from "./PostItem";

function PostList({ remove, posts, title }) {
  if (!posts.length) return <h1 style={{ textAlign: "center", color: "red" }}>Посты не найдены!</h1>

  return (
    <div>
      <h1>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => 
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} number={index + 1} post={post} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
}

export default PostList;
