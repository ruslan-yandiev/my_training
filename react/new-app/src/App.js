import React, { useState } from "react";
// import Counter from "./components/Counter"; // ! когда export default Counter;
// import { Postitem } from "./components/Postitem"; // ! кога export function Postitem() {...}
import PostList from "./components/PostList";
import "./styles/App.css";
import TestsList from "./components/TestsList";

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "javascript", body: "Description" },
    { id: 2, title: "JS", body: "Description" },
    { id: 3, title: "JS", body: "Description" },
  ]);

  const tests = [
    { id: 1, title: "React", body: ["react - 1", "react - 2", "react - 3"], info: "Ruslan" },
    { id: 2, title: "SCSS", body: ["SCSS - 1", "SCSS - 2", "SCSS - 3"], info: "Sultan" },
    { id: 3, title: "HTML", body: ["HTML - 1", "HTML - 2", "HTML - 3"], info: "Toma" },
  ];

  const [posts2, setPosts2] = useState([
    { id: 1, title: "Ruby", body: "Description" },
    { id: 2, title: "Ruby", body: "Description" },
    { id: 3, title: "Ruby", body: "Description" },
  ]);

  return (
    <div className="App">
      <PostList posts={posts2} title={"Посты про JS"} />
      <PostList posts={posts2} title={"Посты про Ruby"} />
      <TestsList tests={tests} />
    </div>
  );
}

export default App;
