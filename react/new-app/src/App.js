/*
*Установленные библиотеки помимо дефолтных:
  React Transition Group - библиатека React для анимации (удобный инструмент)
  axios - библиотека для запросов на сервер
*/

import React, { useRef, useState, useEffect } from "react";
// import Counter from "./components/Counter"; // ! когда export default Counter;
// import { Postitem } from "./components/Postitem"; // ! кога export function Postitem() {...}
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import "./styles/App.css";
import TestsList from "./components/TestsList";
// import MySelect from "./components/UI/select/MySelect";
// import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts"; // наш кастомный хук.
import PostService from "./API/PostService";

// ===========================================================================================================================================
function App() {
  const tests = [
    { id: 1, title: "React", body: ["react - 1", "react - 2", "react - 3"], info: "Ruslan" },
    { id: 2, title: "SCSS", body: ["SCSS - 1", "SCSS - 2", "SCSS - 3"], info: "Sultan" },
    { id: 3, title: "HTML", body: ["HTML - 1", "HTML - 2", "HTML - 3"], info: "Toma" },
  ];
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query: ''});
  const [modal, setModal] = useState(false);
  const [isPostsLoading, setIsPostsLoading] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query); // наш кастомный хук.

  useEffect(()=> {
    fetchPosts(); //* к примеру можем сразу подгрузить посты с сервера единожды при первом рендеренге компонентов.
  }, []) // массив зависимостей сделаем пустым, чтобы функция отработалаь лишь единожды в момент монтирования компонента.


  // функция колбека для проброски через пропс дочернему компоненту, для передачи дочерним компонентом данных.
  function updateData(post) {
    setPosts([...posts, { ...post, id: Date.now() }]);
    setModal(false);
  }

  // получаем post из дочернего компонета
  function removePost(post) {
    // setPosts(posts.filter((p) => p !== post)); //! тоже работает, понять как лучше.
    setPosts(posts.filter((p) => p.id !== post.id));
  }

  async function fetchPosts() {
    const postsFromServer = await PostService.getAll();
    setPosts(postsFromServer);
  } 

  return (
    <div className="App">
    <MyButton onClick={fetchPosts}>GET POSTS</MyButton>
      <MyButton onClick={()=> setModal(true)} style={{marginTop: 30}}>Создать пользователя</MyButton>

      <MyModal visible={modal} setVisible={setModal}>
        <PostForm updateData={updateData} />
      </MyModal>

      <hr style={{ margin: "15px 0" }} />

      <PostFilter filter={filter} setFilter={setFilter}/>

      {<PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список языков программирования:"} />}
      
      <TestsList tests={tests} />
    </div>
  );
}

export default App;
