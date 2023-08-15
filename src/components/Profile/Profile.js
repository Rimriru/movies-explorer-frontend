import { useState } from "react";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { useForm } from "../../utils/formValidation";
import "./Profile.css";

export default function Profile({ onSignOut, error }) {
  const formManagement = useForm();
  const nameInputValue = formManagement.values.name;
  // будет подтягиваться юзер с сервера на следующем этапе, но пока так
  // все обработчики будут в app
  const [isInputDisabled, setIsInputDisabled] = useState(true);

  const handleEditProfileBtnClick = () => {
    setIsInputDisabled(false);
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    setIsInputDisabled(true);
  };

  const handleSignOut = () => {
    onSignOut();
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__heading">{`Привет, ${
          nameInputValue !== undefined ? nameInputValue : ""
        }!`}</h1>
        <form
          className="profile__form"
          method="POST"
          onSubmit={handleProfileFormSubmit}
          noValidate
        >
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              name="name"
              required
              minLength={2}
              maxLength={30}
              disabled={isInputDisabled}
              onChange={formManagement.handleChange}
            />
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              name="email"
              required
              type="email"
              disabled={isInputDisabled}
              onChange={formManagement.handleChange}
            />
          </label>
          {isInputDisabled ? (
            <div className="profile__btn-container">
              <button
                className="profile__btn"
                type="button"
                onClick={handleEditProfileBtnClick}
              >
                Редактировать
              </button>
              <button
                className="profile__btn"
                type="button"
                onClick={handleSignOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <>
              <ApiErrorMessage placement="profile" errorText={error} />
              <button className="profile__submit-btn" type="submit">
                Сохранить
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}
