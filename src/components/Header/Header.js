import './Header.css';
import Navigation from '../Navigation/Navigation.js';

export default function Header({ isLoggedIn }) {
  return (
    <header className={`header ${isLoggedIn ? "header_logged" : ""}`}>
      <div className={`logo ${isLoggedIn ? "logo_logged" : ""}`}></div>
      <Navigation isLoggedIn={isLoggedIn}></Navigation>
    </header>
  );
};
