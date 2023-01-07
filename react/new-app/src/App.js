/*
*Установленные библиотеки помимо дефолтных:
  React Transition Group - библиатека React для анимации (удобный инструмент)
  axios - библиотека для запросов на сервер
  react-router-dom - библиотека для управления роутингом в браузере/ Будет отслеживать изменение пути и перерисовывать компоненты
    react-router-dom V6 сильно отличается от V5 (как в реализации)
*/

import React, {useState, useEffect} from "react";
import "./styles/App.css";

 // чтобы при переходе по ссылкам между страницами не происходило обновлений страницы (иначе нарушается SPA) нужно использовать компонент //! Link и его пропс to
 // Routes, // instead of "Switch" - теперь вместо Switch в версии 6 используем обязательный Routes
 // Navigate - если не один из маршрутов не сработает то он будет переводить на адрес /posts . Чтобы сохранить историю чистой, вы должны установить пропс replace. Это позволит избежать дополнительных перенаправлений после того, как пользователь нажмет «Назад».
import { BrowserRouter} from "react-router-dom"; //  - библиотека для управления роутингом в браузере/ Будет отслеживать изменение пути и перерисовывать компоненты
import Navbar from "./components/UI/Navbar/Navbar";
import AppRouter from "./components/AppRouter";
import { AuthContext } from "./context";
// ===========================================================================================================================================
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // состояние отвечающее за информацию о состоянии дающий информации закончился ли запрос или нет на сервер

  // При каждом обновлении страницы будем проверять в локальном хранилище браузера (можем и в куках отдельно проверить в зависимости от способа индентификатора)
  // и если полученное значение из localStorage браузера говорит нам, что пользователь авторизировался, то мы каждый раз при перезагрузки странице будем менять состояние на true
  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, isLoading}}>
      <BrowserRouter>
        <Navbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
