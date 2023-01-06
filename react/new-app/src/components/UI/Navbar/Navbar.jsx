import React from "react";
// чтобы при переходе по ссылкам между страницами не происходило обновлений страницы (иначе нарушается SPA) нужно использовать компонент //! Link и его пропс to
import { Link } from "react-router-dom"; //  - библиотека для управления роутингом в браузере/ Будет отслеживать изменение пути и перерисовывать компоненты

function Navbar () {
  return (
    <div className="navbar">
      <div className="navbar__links">
        <Link to="/about">0 Сайт</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  )
}

export default Navbar;