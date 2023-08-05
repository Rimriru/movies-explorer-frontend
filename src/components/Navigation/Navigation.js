import { Link, useLocation } from "react-router-dom";
import useIsMobile from "../../utils/windowResize";
import "./Navigation.css";

export default function Navigation({
  isLoggedIn,
  isNavigationOpened,
  setIsNavigationOpened,
  isMain,
}) {
  const isMobile = useIsMobile();
  const currentLocation = useLocation();
  const isMovies = currentLocation.pathname === "/movies";
  const isSavedMovies = currentLocation.pathname === "/saved-movies";

  const handleLinkClick = () => {
    setIsNavigationOpened(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <nav
          className={`navigation ${isLoggedIn ? "navigation_logged" : ""} ${
            isMobile ? "navigation_mobile" : ""
          } ${isNavigationOpened ? "navigation_opened" : ""}`}
        >
          <ul className="navigation__links">
            {isMobile && (
              <li>
                <Link
                  to="/"
                  className={`navigation__link ${
                    isMain && isMobile ? "navigation__link_current-mobile" : ""
                  }`}
                  onClick={handleLinkClick}
                >
                  Главная
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/movies"
                className={`navigation__link ${
                  isMovies && isMobile ? "navigation__link_current-mobile" : ""
                }${isMovies ? "navigation__link_current-desktop" : ""}`}
                onClick={handleLinkClick}
              >
                Фильмы
              </Link>
            </li>
            <li>
              <Link
                to="/saved-movies"
                className={`navigation__link ${
                  isSavedMovies && isMobile
                    ? "navigation__link_current-mobile"
                    : ""
                }${isSavedMovies ? "navigation__link_current-desktop" : ""}`}
                onClick={handleLinkClick}
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link
            to="/profile"
            className="navigation__link navigation__link_logged"
            onClick={handleLinkClick}
          >
            <p className="navigation__account">Аккаунт</p>
            <div className="navigation__account-icon"></div>
          </Link>
        </nav>
      ) : (
        <nav className="navigation">
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
