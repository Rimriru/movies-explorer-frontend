import { Link } from "react-router-dom";
import "./AuthRegisterForm.css";

export default function AuthLoginForm({ children, isRegister, isValid, onSubmit }) {
  return (
    <form className="form" method="POST" onSubmit={onSubmit}>
        {children}
        <button className="form__submit-btn" type="submit" disabled={!isValid}>
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
        <p className="form__text">
          {isRegister ? "Уже зарегистрированы?" : "Ещё не зарегистрированы?"}
          <Link className="form__link" to={`${isRegister ? "/signin" : "/signup"}`}>{isRegister ? "Войти" : "Регистрация"}</Link>
        </p>
    </form>
  );
}
