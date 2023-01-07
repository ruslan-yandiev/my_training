import React, {useContext} from "react";
import { AuthContext } from "../../../context";
// чтобы при переходе по ссылкам между страницами не происходило обновлений страницы (иначе нарушается SPA) нужно использовать компонент //! Link и его пропс to
import { Link } from "react-router-dom"; //  - библиотека для управления роутингом в браузере/ Будет отслеживать изменение пути и перерисовывать компоненты
import MyButton from "../button/MyButton";

function Navbar () {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  function logout() {
    setIsAuth(false)
    localStorage.removeItem('auth'); // очищаем данные по ключю из хранилища
  }

  return (
    <div className="navbar">
      <div className="navbar__links">
        {isAuth
          ?
          <div>
            <Link to="/about">0 Сайт</Link>
            <Link to="/posts">Посты</Link>
            <MyButton onClick={logout}>Выход</MyButton>
          </div>
          :
          <div>
            <Link to="/about">0 Сайт</Link>
            <Link to="/posts">Посты</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Navbar;