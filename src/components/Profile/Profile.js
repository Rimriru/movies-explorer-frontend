import { useContext, useState, useEffect } from "react";
import ApiErrorMessage from "../ApiErrorMessage/ApiErrorMessage";
import { useFormWithValidation } from "../../utils/formValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { nameRegExp, emailRegExp } from "../../utils/formValidation";
import "./Profile.css";

export default function Profile({ onSignOut, onSubmit, onChange, error }) {
  const currentUserData = useContext(CurrentUserContext);
  const formValidation = useFormWithValidation();
  const [isInputDisabled, setIsInputDisabled] = useState(true);
  const [userData, setUserData] = useState({ name: "", email: "" });

  useEffect(() => {
    setUserData({ name: currentUserData.name, email: currentUserData.email });
  }, [currentUserData]);

  useEffect(() => {
    if(error) {
      setIsInputDisabled(false);
    }
  }, [error]);

  const handleEditProfileBtnClick = () => {
    setIsInputDisabled(false);
  };

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    const { name, email } = formValidation.values;
    const valuesToSubmit = {
      name: name !== undefined ? name : userData.name,
      email: email !== undefined ? email : userData.email
    };
    onSubmit(valuesToSubmit);
    if(!error) {
      setIsInputDisabled(true);
    } else {
      setIsInputDisabled(false);
    }
  };

  const handleSignOut = () => {
    onSignOut();
  }; 

  const handleChange = (e) => {
    formValidation.handleChange(e);
    onChange();
  }

  return (
    <main>
      <section className="profile">
        <h1 className="profile__heading">{`Привет, ${
          userData.name
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
              defaultValue={userData.name}
              pattern={nameRegExp}
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
              pattern={emailRegExp}
              onChange={handleChange}
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
              <button className="profile__submit-btn" type="submit" disabled={!formValidation.isValid || error}>
                Сохранить
              </button>
            </>
          )}
        </form>
      </section>
    </main>
  );
}
