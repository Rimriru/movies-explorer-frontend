import Navigation from "../Navigation/Navigation.js";
import useIsMobile from "../../utils/windowResize";
import { useState } from "react";
import "./Header.css";
import { useLocation, Link } from "react-router-dom";

export default function Header({ isLoggedIn }) {
  const currentLocation = useLocation();
  const isMain = currentLocation.pathname === "/";
  const isMobile = useIsMobile();

  const [isNavigationOpened, setIsNavigationOpened] = useState(false);

  const burgerClick = () => {
    setIsNavigationOpened(!isNavigationOpened);
  };

  return (
    <header
      className={`header ${isLoggedIn ? "header_logged" : ""} ${
        isMain ? "header_main" : ""
      }`}
    >
      <Link to="/">
        <div className="logo"></div>
      </Link>
      <Navigation isLoggedIn={isLoggedIn} isMobile={isMobile} isNavigationOpened={isNavigationOpened} setIsNavigationOpened={setIsNavigationOpened}
      isMain={isMain}></Navigation>
      <div
        className={`header__burger-btn ${
          isMobile && isLoggedIn ? "header__burger-btn_showed" : ""
        } ${isNavigationOpened ? "header__burger-btn_clicked" : ""}`}
        onClick={burgerClick}
      >
        <span className="header__burger-center"></span>
      </div>
    </header>
  );
};
