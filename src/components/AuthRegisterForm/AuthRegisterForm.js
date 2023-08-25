import { Link } from "react-router-dom";
import { useState } from "react";
import "./AuthRegisterForm.css";

export default function AuthLoginForm({ children, isRegister, isValid, error, onSubmit }) {
  const [isAuthSubmitBtnDisabled, setIsAuthSubmitBtnDisabled] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAuthSubmitBtnDisabled(true);
    onSubmit(setIsAuthSubmitBtnDisabled);
  };

  return (
    <form className="form" method="POST" onSubmit={handleSubmit}>
        {children}
        <button className="form__submit-btn" type="submit" disabled={!isValid || error || isAuthSubmitBtnDisabled}>
          {isRegister ? "Зарегистрироваться" : "Войти"}
        </button>
        <p className="form__text">
          {isRegister ? "Уже зарегистрированы?" : "Ещё не зарегистрированы?"}
          <Link className="form__link" to={`${isRegister ? "/signin" : "/signup"}`}>{isRegister ? "Войти" : "Регистрация"}</Link>
        </p>
    </form>
  );
}
