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
import Loader from "./components/UI/Loader/Loader"; // наш анимация загрузки
import { useFetching } from "./hooks/useFetching"; // кастомный хук для обработки кейса (обработка и показ индикатора загрузки, обработка ошибки, и выполнение какого то колбека)
import { getPageCount } from "./utils/pages"; // наши функции для вычислений
import Pagination from "./components/UI/pagination/Pagination";
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
  const [limit, setLimit] = useState(10); // создадим состояние с лимитом
  const [page, setPage] = useState(1) // состояние с номером страницы
  const [totalPages, setTotalPages] = useState(0); // состояние которое хранит общее количество страниц

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
      const response = await PostService.getAll(limit, page);
      setPosts(response.data);
      const totalCount = response.headers['x-total-count']; // достаем общее количество постов
      setTotalPages(getPageCount(totalCount, limit));
  });

  // console.log(posts);
  // console.log(filter.sort);
  // console.log(filter);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query); // наш кастомный хук.

  useEffect(()=> {
    fetchPosts(limit, page); //* к примеру можем сразу подгрузить посты с сервера единожды при первом рендеренге компонентов.
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

  // ! из-за того, что все изменения состояния в Риакт асинхронны и Риакт применяет их только после накопления, номер страницы page попадет в состояние с задержкой
  // ! что вызовет не коректные полученные данные в запросе.
  // ! это можно решить добавив useEffect page в качестве зaвисимости page. Второй способ передать в useFetching колбек с аргументами limit и page и при вызове fetchPosts(limit, page) эти аргументы, так сказать контекст, не забыть передать аргумены в реализации useFetching
  function changePage(page) {
    setPage(page);
    fetchPosts(limit, page);
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

      {postError && <h1>Произошла ошибка ${postError}</h1>}

      {
        isPostsLoading 
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}> <Loader /> </div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={"Список языков программирования:"} />
      }
      
      <TestsList tests={tests} />

      <Pagination totalPages={totalPages} page={page} changePage={changePage}/>
    </div>
  );
}

export default App;
