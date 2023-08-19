import AuthRegisterForm from "../AuthRegisterForm/AuthRegisterForm";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { useFormWithValidation }  from "../../utils/formValidation";
import { Link } from "react-router-dom";
import { emailRegExp } from "../../utils/formValidation";
import "./Login.css";

export default function Login({ onSubmit, error }) {
  const formValidation = useFormWithValidation();
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
        <h1 className="auth-content__heading">Рады видеть!</h1>
        <AuthRegisterForm isValid={formValidation.isValid} onSubmit={handleSubmit}>
          <label className="auth-content__label" htmlFor="email">
            E-mail
            <input
              className="auth-content__input"
              name="email"
              type="email"
              required
              placeholder="Введите Ваш E-mail"
              pattern={emailRegExp}
              autoComplete="false"
              onChange={formValidation.handleChange}
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
              placeholder="А здесь Ваш пароль"
              autoComplete="false"
              onChange={formValidation.handleChange}
            />
          </label>
          <span className={`auth-content__error ${passwordError ? "auth-content__error_visible" : ""}`}>{passwordError}</span>
          <ApiErrorMessage placement="login" errorText={error} />
        </AuthRegisterForm>
      </section>
    </main>
  );
}
