import { Link } from "react-router-dom";
import useIsMobile from "../../utils/windowResize";
import "./Navigation.css";

export default function Navigation({ isLoggedIn, isNavigationOpened, isMain }) {
  const isMobile = useIsMobile();
  const isMovies = window.location.pathname === '/movies';
  const isSavedMovies = window.location.pathname === '/saved-movies';

  return (
    <>
      {isLoggedIn ? (
        <nav
          className={`navigation ${isLoggedIn ? "navigation_logged" : ""} ${
            isMobile ? "navigation_mobile" : ""
          } ${isNavigationOpened ? "navigation_opened" : ""}`}
        >
          <ul className="navigation__links">
            {isMobile && <li>
              <Link to="/" className={`navigation__link ${isMain ? "navigation__link_current" : ""}`}>
                Главная
              </Link>
            </li>}
            <li>
              <Link to="/movies" className={`navigation__link ${isMovies ? "navigation__link_current" : ""}`}>
                Фильмы
              </Link>
            </li>
            <li>
              <Link to="/saved-movies" className={`navigation__link ${isSavedMovies ? "navigation__link_current" : ""}`}>
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
        </nav>
      ) : (
        <nav
          className="navigation"
        >
          <Link to="/sign-up" className="navigation__registry">
            Регистрация
          </Link>
          <Link to="/sign-in" className="navigation__login">
            <button className="navigation__login-button">Войти</button>
          </Link>
        </nav>
      )}
    </>
  );
}
