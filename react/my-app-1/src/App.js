import React, { useState } from "react";
import ClassCounter from "./components/ClassCounter";
import Counter from "./components/Counter";
import "./styles/App.css"; // Импортируем наши стили
import PostItem from "./components/PostItem";

function App() {
  const [posts, setPost] = useState([
    {id: 1, title: 'JavaScript', body: 'Description'},
    {id: 2, title: 'JavaScript 2', body: 'Description'},
    {id: 3, title: 'JavaScript 3', body: 'Description'}
  ])

  return (
    <div className="App">
      {posts.map((post) => 
        <PostItem post={post}/>
        )}
      <Counter />
      <Counter />
      <ClassCounter />
      <ClassCounter />
    </div>
  );
}

export default App;
