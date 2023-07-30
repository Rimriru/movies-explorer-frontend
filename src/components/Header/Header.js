import Navigation from "../Navigation/Navigation.js";
import useIsMobile from "../../utils/windowResize";
import { useState } from "react";
import "./Header.css";

export default function Header({ isLoggedIn }) {
  const isMain = window.location.pathname === "/";
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
      <div className="logo"></div>
      <Navigation isLoggedIn={isLoggedIn} isNavigationOpened={isNavigationOpened}
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
}
