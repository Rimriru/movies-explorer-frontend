import { useContext, useState, useEffect } from "react";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { useFormWithValidation } from "../../utils/formValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { EMAIL_REG_EXP, NAME_REG_EXP } from "../../utils/formValidation";
import compareTwoObjects from "../../utils/functions.js";
import "./Profile.css";

export default function Profile({ onSignOut, onSubmit, onChange, error, isMessageVisible }) {
  const currentUserData = useContext(CurrentUserContext);
  const formValidation = useFormWithValidation();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [isSubmitBtnDisabled, setIsSubmitBtnDisabled] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    setUserData({ name: currentUserData.name, email: currentUserData.email });
  }, [currentUserData]);

  useEffect(() => {
    if (error) {
      setIsInputDisabled(false);
    }
  }, [error]);

  const handleEditProfileBtnClick = () => {
    setIsInputDisabled(false);
    setIsSubmitBtnDisabled(true);
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    const { name, email } = formValidation.values;
    const valuesToSubmit = {
      name: name !== undefined ? name : userData.name,
      email: email !== undefined ? email : userData.email,
    };
    const isEqual = compareTwoObjects(valuesToSubmit, userData);
    if (isEqual) {
      setIsSubmitBtnDisabled(true);
    } else {
      setIsSubmitBtnDisabled(true);
      onSubmit(valuesToSubmit);
      return !error ? setIsInputDisabled(true) : setIsInputDisabled(false);
    }
  };

  const handleSignOut = () => {
    onSignOut();
  };

  const handleChange = (e) => {
    formValidation.handleChange(e);
    onChange();
    setIsSubmitBtnDisabled(false);
  };

  return (
    <main>
      <section className="profile">
        <h1 className="profile__heading">{`Привет, ${userData.name}!`}</h1>
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
              defaultValue={userData.name}
              pattern={NAME_REG_EXP}
              onChange={handleChange}
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
              defaultValue={userData.email}
              pattern={EMAIL_REG_EXP}
              onChange={handleChange}
            />
          </label>
          {isInputDisabled ? (
            <div className="profile__btn-container">
              <span
                className={`profile__success-message${
                  isMessageVisible
                    ? " profile__success-message_visible"
                    : ""
                }`}
              >
                Данные профиля успешно изменены!
              </span>
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
              <button
                className="profile__submit-btn"
                type="submit"
                disabled={
                  !formValidation.isValid || error || isSubmitBtnDisabled
                }
              >
                Сохранить
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}
