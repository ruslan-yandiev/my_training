import React, { useState } from "react";
// import Counter from "./components/Counter"; // ! когда export default Counter;
// import { Postitem } from "./components/Postitem"; // ! кога export function Postitem() {...}
import PostList from "./components/PostList";
import "./styles/App.css";
import TestsList from "./components/TestsList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";

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

  function addNewPost() {
    posts.push({ id: posts[posts.length - 1].id + 1, title: namePost, body: bodyPost });
    setPosts(posts);
  }

  const [namePost, setNamePost] = useState("");
  const [bodyPost, setBodyPost] = useState("");

  return (
    <div className="App">
      <form>
        <MyInput type="text" placeholder="Название поста" value={namePost} onChange={(event) => setNamePost(event.target.value)} />
        <MyInput type="text" placeholder="Описание поста" value={bodyPost} onChange={(event) => setBodyPost(event.target.value)} />
        <MyButton onClick={addNewPost} disabled>
          Create post
        </MyButton>
      </form>

      <PostList posts={posts} />
      <TestsList tests={tests} />
    </div>
  );
}

export default App;
