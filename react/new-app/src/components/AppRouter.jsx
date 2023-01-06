import React from "react";
import About from "../pages/About";
import Posts from "../pages/Posts";
import Error from "../pages/Error";
import PostidPage from "../pages/PostidPage";

 // чтобы при переходе по ссылкам между страницами не происходило обновлений страницы (иначе нарушается SPA) нужно использовать компонент //! Link и его пропс to
 // Routes, // instead of "Switch" - теперь вместо Switch в версии 6 используем обязательный Routes
 // Navigate - если не один из маршрутов не сработает то он будет переводить на адрес /posts . Чтобы сохранить историю чистой, вы должны установить пропс replace. Это позволит избежать дополнительных перенаправлений после того, как пользователь нажмет «Назад».
import { Routes, Route, Navigate } from "react-router-dom"; //  - библиотека для управления роутингом в браузере/ Будет отслеживать изменение пути и перерисовывать компоненты

// тут мы статически формеруем наши пути (маршруты) и редиректы
function AppRouter() {
  return (
    <Routes>
      <Route path="/about" element={<About/>} />
      <Route path="/posts" element={<Posts/>} />
      <Route path="/posts/:id" element={<PostidPage/>} /> {/*для того, чтобы маршрут был динамическим нужно указать :id динамическую часть пути. в рятой версии пришлось бы в обоих комопнентах Route добавить пропс exact*/}
      <Route path="/error" element={<Error/>} />
      <Route path="*" element={<Navigate to="/error" replace />}/>
      <Route path="/" element={<Navigate to="/posts" replace />}/>
    </Routes>
  )
}

export default AppRouter;