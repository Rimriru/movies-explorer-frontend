import { Link } from "react-router-dom";
import "./AuthRegisterForm.css";

export default function AuthLoginForm({ children, isRegister }) {
  return (
    <form className="form" method="POST">
        {children}
        <button className="form__submit-btn" type="submit">
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
        <p className="form__text">
          {isRegister ? "Уже зарегистрированы?" : "Ещё не зарегистрированы?"}
          <Link className="form__link" to={`${isRegister ? "/sign-in" : "/sign-up"}`}>{isRegister ? "Войти" : "Регистрация"}</Link>
        </p>
    </form>
  );
}
