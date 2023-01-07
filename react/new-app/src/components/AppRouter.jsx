// useContext - хук для доступа к глобальному контексту (можем создать некое глобальное хранилище и из любого компонента к этому глобальному хранилищу обращаться при этом избегая цепочки передачи данных от родителя потомку.)
import React, {useContext} from "react";
import { privateRoutes, publicRoutes } from "../router"; // наш массив с маршрутами

 // чтобы при переходе по ссылкам между страницами не происходило обновлений страницы (иначе нарушается SPA) нужно использовать компонент //! Link и его пропс to
 // Routes, // instead of "Switch" - теперь вместо Switch в версии 6 используем обязательный Routes
 // Navigate - если не один из маршрутов не сработает то он будет переводить на адрес /posts . Чтобы сохранить историю чистой, вы должны установить пропс replace. Это позволит избежать дополнительных перенаправлений после того, как пользователь нажмет «Назад».
 import { Routes, Route, Navigate } from "react-router-dom"; //  - библиотека для управления роутингом в браузере/ Будет отслеживать изменение пути и перерисовывать компоненты
import { AuthContext } from "../context";
import Loader from "./UI/Loader/Loader";

// тут мы статически формеруем наши пути (маршруты) и редиректы
function AppRouter() {
  const {isAuth, isLoading} = useContext(AuthContext);

  // пока пользователь авторизован и данные подгружаются нас не редиректид и мы отображаем анимацию процесса загрузки
  if (isLoading) {
    return <Loader/>
  }

  return (
    isAuth
    ?
      <Routes>
        {privateRoutes.map(route => 
          <Route path={route.path} element={<route.component/>} key={route.path} />
        )}

        <Route path="*" element={<Navigate to="/error" replace />}/>
        <Route path="/" element={<Navigate to="/posts" replace />}/>
        <Route path="/login" element={<Navigate to="/posts" replace />}/>
      </Routes>
    :
      <Routes>
        {publicRoutes.map(route => 
          <Route path={route.path} element={<route.component/>} key={route.path} />
        )}

        <Route path="*" element={<Navigate to="/login" replace />}/>
      </Routes>
  )
}

export default AppRouter;