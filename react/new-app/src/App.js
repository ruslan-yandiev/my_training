import React, { useRef, useState, useMemo } from "react";

/*
! Хук useMemo(callback, deps)
первым аргументом принимает функцию колбе. вторым принимает массив зависимостей. Осуществляем кэширования результата вычислений (разновидность патерна Декоратор). Нужно импортировать из React
Переданная функция колбек должна возвращать результат каких то вычислений/
К примеру она поможет не отрисовывать каждый раз отсортированный массив и достанет уже отсартированный массив из кеша. Но каждый раз когда какая то из зовисимосте в массиве deps изменилась то функция вновь пересчитывает и кэширует результат вычисления.
Если массив зависимосте пустой, то функция отработает лишь единожды, запомнит результат и больше вызвана не будет.
*/

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

// ===========================================================================================================================================
function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: "ааа", body: "ббббб" },
    { id: 2, title: "бббб", body: "аааа" },
    { id: 3, title: "вввв", body: "ггггг" },
  ]);

  const tests = [
    { id: 1, title: "React", body: ["react - 1", "react - 2", "react - 3"], info: "Ruslan" },
    { id: 2, title: "SCSS", body: ["SCSS - 1", "SCSS - 2", "SCSS - 3"], info: "Sultan" },
    { id: 3, title: "HTML", body: ["HTML - 1", "HTML - 2", "HTML - 3"], info: "Toma" },
  ];

  const [filter, setFilter] = useState({sort:'', query: ''});
  const [modal, setModal] = useState(false);

  // Отсортировываем массив постов
  const sortedPosts = useMemo(() => filter.sort ? [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort])) : posts, [filter.sort, posts]); // localeCompare - функуия используется для сравнения строк при сортировке. sort изменяет объект при вызове, по этому делаем копию [...obj]
  
  // Отфильтровываем отсортированный массив постов
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) => post.title.toLowerCase().includes(filter.query.toLowerCase()))
  }, [filter.query, sortedPosts]);

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

  return (
    <div className="App">
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
