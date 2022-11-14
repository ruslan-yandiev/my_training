import React, { useRef, useState } from "react";
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

  const [post, setPost] = useState({ title: "", body: "" });
  // const bodyInputRef = useRef(); // с помощью этого хука мы можем получить доступ к DOM элементу и уже у этого DOM элемента забрать value

  function addNewPost(event) {
    event.preventDefault();

    setPosts([...posts, { ...post, id: Date.now() }]); //! мы не изменяем состояние напрямую а используем для этого хук. Важная концепция !!!!!!!!!!!!!
    setPost({ title: "", body: "" });
    // console.log(bodyInputRef.current.value);
  }

  return (
    <div className="App">
      <form>
        {/*//!Управляемые компоненты*/}
        <MyInput value={post.title} type="text" placeholder="Название поста" onChange={(event) => setPost({ ...post, title: event.target.value })} />
        <MyInput value={post.body} type="text" placeholder="Описание поста" onChange={(event) => setPost({ ...post, body: event.target.value })} />

        {/*//!Не управляемые компоненты*/}
        {/*<MyInput ref={bodyInputRef} type="text" placeholder="Описание поста" />*/}
        {/*<input ref={bodyInputRef} type="text" />*/}
        <MyButton onClick={addNewPost}>Create post</MyButton>
      </form>

      <PostList posts={posts} />
      <TestsList tests={tests} />
    </div>
  );
}

export default App;
