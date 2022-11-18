import React, { useRef, useState } from "react";
// import Counter from "./components/Counter"; // ! когда export default Counter;
// import { Postitem } from "./components/Postitem"; // ! кога export function Postitem() {...}
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import "./styles/App.css";
import TestsList from "./components/TestsList";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "javascript", body: "Description" },
    { id: 2, title: "JS", body: "Description" },
    { id: 3, title: "SQL", body: "Description" },
  ]);

  const tests = [
    { id: 1, title: "React", body: ["react - 1", "react - 2", "react - 3"], info: "Ruslan" },
    { id: 2, title: "SCSS", body: ["SCSS - 1", "SCSS - 2", "SCSS - 3"], info: "Sultan" },
    { id: 3, title: "HTML", body: ["HTML - 1", "HTML - 2", "HTML - 3"], info: "Toma" },
  ];

  // функция колбека для проброски через пропс дочернему компоненту, для передачи дочерним компонентом данных.
  function updateData(post) {
    setPosts([...posts, { ...post, id: Date.now() }]);
  }

  // получаем post из дочернего компонета
  function removePost(post) {
    // setPosts(posts.filter((p) => p !== post)); //! тоже работает, понять как лучше.
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  return (
    <div className="App">
      <PostForm updateData={updateData} />
      {/* Условная отрисовка */}
      {posts.length !== 0 ? <PostList remove={removePost} posts={posts} title={"Список языков программирования:"} /> : <h1 style={{ textAlign: "center", color: "red" }}>Посты не найдены!</h1>}
      <TestsList tests={tests} />
    </div>
  );
}

export default App;
