import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation({ isLoggedIn }) {
  return (
    <>
      <nav className={`navigation ${isLoggedIn ? "navigation_logged" : ""}`}>
        {isLoggedIn ? (
          <>
            <ul className="navigation__links">
              <li>
                <Link to="/movies" className="navigation__link">
                  Фильмы
                </Link>
              </li>
              <li>
                <Link to="/savedmovies" className="navigation__link">
                  Сохранённые фильмы
                </Link>
              </li>
            </ul>
            <Link
              to="/account"
              className="navigation__link navigation__link_logged"
            >
              <p className="navigation__account">Аккаунт</p>
              <div className="navigation__account-icon"></div>
            </Link>
          </>
        ) : (
          <>
            <Link to="/sign-up" className="navigation__registry">
              Регистрация
            </Link>
            <Link to="/sign-in" className="navigation__login">
              <button className="navigation__login-button">Войти</button>
            </Link>
          </>
        )}
      </nav>
    </>
  );
}
