import AuthLoginForm from "../AuthRegisterForm/AuthRegisterForm";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  return (
    <section className="auth-content">
      <Link to='/'>
        <div className="logo logo_auth"></div>
      </Link>
      <h2 className="auth-content__heading">Добро пожаловать!</h2>
      <AuthLoginForm isRegister={true}>
        <label className="auth-content__label" htmlFor="name">
          Имя
          <input className="auth-content__input"    name="name"
          />
        </label>
        <span className="auth-content__error"></span>
        <label className="auth-content__label" htmlFor="email">
          E-mail
          <input className="auth-content__input" name="email"
          type="email"
          />
        </label>
        <span className="auth-content__error"></span>
        <label className="auth-content__label" htmlFor="password">
          Пароль
          <input className="auth-content__input auth-content__input_errored" name="password"
          type="password"
          />
        </label>
        <span className="auth-content__error auth-content__error_visible">Что-то пошло не так...</span>
      </AuthLoginForm>
    </section>
  );
};
