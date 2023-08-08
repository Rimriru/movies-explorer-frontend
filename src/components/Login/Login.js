import AuthRegisterForm from "../AuthRegisterForm/AuthRegisterForm";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  return (
    <main>
      <section className="auth-content">
        <Link to="/">
          <div className="logo logo_auth"></div>
        </Link>
        <h1 className="auth-content__heading">Рады видеть!</h1>
        <AuthRegisterForm>
          <label className="auth-content__label" htmlFor="email">
            E-mail
            <input
              className="auth-content__input"
              name="email"
              type="email"
              required
              placeholder="Введите Ваш E-mail"
            />
          </label>
          <span className="auth-content__error"></span>
          <label className="auth-content__label" htmlFor="password">
            Пароль
            <input
              className="auth-content__input"
              name="password"
              type="password"
              minLength={5}
              maxLength={30}
              required
              placeholder="А здесь Ваш пароль"
            />
          </label>
          <span className="auth-content__error"></span>
          <ApiErrorMessage placement="login" />
        </AuthRegisterForm>
      </section>
    </main>
  );
}
