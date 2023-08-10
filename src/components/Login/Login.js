import AuthRegisterForm from "../AuthRegisterForm/AuthRegisterForm";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { useFormWithValidation }  from "../../utils/formValidation";
import { Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const formValidation = useFormWithValidation();
  const emailError = formValidation.errors.email;
  const passwordError = formValidation.errors.password;
  return (
    <main>
      <section className="auth-content">
        <Link to="/">
          <div className="logo logo_auth"></div>
        </Link>
        <h1 className="auth-content__heading">Рады видеть!</h1>
        <AuthRegisterForm isValid={formValidation.isValid}>
          <label className="auth-content__label" htmlFor="email">
            E-mail
            <input
              className="auth-content__input"
              name="email"
              type="email"
              required
              placeholder="Введите Ваш E-mail"
              pattern="\S*@\S*\.\S*"
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
              minLength={5}
              maxLength={30}
              required
              placeholder="А здесь Ваш пароль"
              onChange={formValidation.handleChange}
            />
          </label>
          <span className={`auth-content__error ${passwordError ? "auth-content__error_visible" : ""}`}>{passwordError}</span>
          <ApiErrorMessage placement="login" />
        </AuthRegisterForm>
      </section>
    </main>
  );
}
