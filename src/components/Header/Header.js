import './Header.css';
import Navigation from '../Navigation/Navigation.js';

export default function Header({ isLoggedIn }) {
  const isMain = window.location.pathname === '/';
  return (
    <header className={`header ${isLoggedIn ? "header_logged" : ""} ${isMain ? "header_main" : ""}`}>
      <div className={`logo ${isLoggedIn ? "logo_logged" : ""}`}></div>
      <Navigation isLoggedIn={isLoggedIn}></Navigation>
    </header>
  );
};
