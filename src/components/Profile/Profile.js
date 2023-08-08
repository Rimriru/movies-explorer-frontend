import { useState } from "react";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import "./Profile.css";

export default function Profile({ onSignOut }) {
  // будет подтягиваться юзер с сервера на следующем этапе, но пока так
  // все обработчики будут в app
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [userName, setUserName] = useState("");

  const handleEditProfileBtnClick = () => {
    setIsInputDisabled(false);
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    setIsInputDisabled(true);
  };

  const handleNameInputChange = (e) => {
    setUserName(e.target.value);
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__heading">{`Привет, ${
          userName !== "" ? userName : ""
        }!`}</h1>
        <form
          className="profile__form"
          method="POST"
          onSubmit={handleProfileFormSubmit}
        >
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              required
              minLength={2}
              maxLength={30}
              disabled={isInputDisabled}
              value={userName}
              onChange={handleNameInputChange}
            />
          </label>
          <label className="profile__label">
            E-mail
            <input
              className="profile__input"
              required
              type="email"
              disabled={isInputDisabled}
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
                onClick={onSignOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          ) : (
            <>
              <ApiErrorMessage placement="profile" />
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
