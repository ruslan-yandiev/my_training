import React, { useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import "./styles/App.css"; // Импортируем наши стили (один из способов)
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";

function App() {
  const [posts, setPost] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'}
  ]);
  

  return (
    <div className="App">
      <form>
        <input type='text' placeholder="Название поста"/>
        <input type='text' placeholder="Описание статьи"/>
        <MyButton>Создать пост</MyButton>
      </form>

      <PostList posts={posts} title={'Пост про JS'}/>
      
      <Counter />
      <Counter />

      <ClassCounter />
      <ClassCounter />
    </div>
  );
}

export default App;
