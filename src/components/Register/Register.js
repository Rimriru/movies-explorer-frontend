import AuthLoginForm from "../AuthRegisterForm/AuthRegisterForm";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { useFormWithValidation }  from "../../utils/formValidation";
import { Link } from "react-router-dom";
import { emailRegExp, nameRegExp } from "../../utils/formValidation";
import "./Register.css";

export default function Register({ onSubmit, onChange, error }) {

  const formValidation = useFormWithValidation();
  const nameError = formValidation.errors.name;
  const emailError = formValidation.errors.email;
  const passwordError = formValidation.errors.password;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValidation.values);
  };

  const handleChange = (e) => {
    formValidation.handleChange(e);
    onChange();
  };
  
  return (
    <main>
      <section className="auth-content">
        <Link to="/">
          <div className="logo logo_auth"></div>
        </Link>
        <h1 className="auth-content__heading">Добро пожаловать!</h1>
        <AuthLoginForm isRegister={true} isValid={formValidation.isValid} error={error} onSubmit={handleSubmit} >
          <label className="auth-content__label" htmlFor="name">
            Имя
            <input
              className="auth-content__input"
              name="name"
              required
              minLength={2}
              maxLength={30}
              placeholder="Введите Ваше имя"
              pattern={nameRegExp}
              autoComplete="false"
              onChange={handleChange}
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
              onChange={handleChange}
              pattern={emailRegExp}
              autoComplete="false"
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
              onChange={handleChange}
              autoComplete="false"
            />
          </label>
          <span className={`auth-content__error ${passwordError ? "auth-content__error_visible" : ""}`}>
            {passwordError}
          </span>
          <ApiErrorMessage placement="register" errorText={error} />
        </AuthLoginForm>
      </section>
    </main>
  );
}
