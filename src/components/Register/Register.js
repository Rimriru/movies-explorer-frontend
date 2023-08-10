import AuthLoginForm from "../AuthRegisterForm/AuthRegisterForm";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { useFormWithValidation }  from "../../utils/formValidation";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register({ onSubmit }) {
  const formValidation = useFormWithValidation();
  const nameError = formValidation.errors.name;
  const emailError = formValidation.errors.email;
  const passwordError = formValidation.errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValidation.values);
  };
  
  return (
    <main>
      <section className="auth-content">
        <Link to="/">
          <div className="logo logo_auth"></div>
        </Link>
        <h1 className="auth-content__heading">Добро пожаловать!</h1>
        <AuthLoginForm isRegister={true} isValid={formValidation.isValid} onSubmit={handleSubmit} >
          <label className="auth-content__label" htmlFor="name">
            Имя
            <input
              className="auth-content__input"
              name="name"
              required
              minLength={2}
              maxLength={30}
              placeholder="Введите Ваше имя"
              onChange={formValidation.handleChange}
            />
          </label>
          <span className={`auth-content__error ${nameError ? "auth-content__error_visible" : ""}`}>{nameError}</span>
          <label className="auth-content__label" htmlFor="email">
            E-mail
            <input
              className="auth-content__input"
              name="email"
              type="email"
              required
              placeholder="Введите Ваш E-mail"
              onChange={formValidation.handleChange}
              pattern="\S*@\S*\.\S*"
            />
          </label>
          <span className={`auth-content__error ${emailError ? "auth-content__error_visible" : ""}`}>{emailError}</span>
          <label className="auth-content__label" htmlFor="password">
            Пароль
            <input
              className="auth-content__input"
              name="password"
              type="password"
              minLength={8}
              maxLength={20}
              required
              placeholder="Введите Ваш пароль"
              onChange={formValidation.handleChange}
            />
          </label>
          <span className={`auth-content__error ${passwordError ? "auth-content__error_visible" : ""}`}>
            {passwordError}
          </span>
          <ApiErrorMessage placement="register" />
        </AuthLoginForm>
      </section>
    </main>
  );
}
