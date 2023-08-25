import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../utils/formValidation";
import { useState, useEffect } from "react";
import "./SearchForm.css";

export default function SearchForm({ isInSaved, onSubmit, onChange, previousSearchValue, wasCheckboxChecked }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(wasCheckboxChecked !== null && !isInSaved ? wasCheckboxChecked === 'true' : true);
  const formValidation = useFormWithValidation();
  const searchInputError = formValidation.errors.title;

  useEffect(() => {
    if (isInSaved) {
      formValidation.resetForm();
      setIsCheckboxChecked(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInSaved) {
      localStorage.setItem("isCheckboxChecked", JSON.stringify(isCheckboxChecked));
    }
  }, [isInSaved, isCheckboxChecked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isInSaved) {
      localStorage.setItem("title", formValidation.values.title);
    }
    onSubmit(formValidation.values.title, isCheckboxChecked);
  };

  const handleCheckboxChange = (e) => {
    const givenTitle = isInSaved ? formValidation.values.title : localStorage.getItem("title");
    setIsCheckboxChecked(e.target.checked);
    if (givenTitle !== "") {
      onChange(givenTitle, e.target.checked);
    } else if (isInSaved && !givenTitle) {
      onChange(e.target.checked);
    }
  };

  return (
    <section className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <div className="search__loupe"></div>
        <div className="search__container">
          <input
            className="search__input"
            placeholder="Фильм"
            name="title"
            required
            onChange={formValidation.handleChange}
            defaultValue={previousSearchValue}
          />
          <span
            className={`search__error ${
              searchInputError ? "search__error_visible" : ""
            }`}
          >{`${searchInputError ? "Нужно ввести ключевое слово" : ""}`}</span>
        </div>
        <button
          className="search__submit-btn"
          type="submit"
          disabled={!formValidation.isValid}
        >
          Найти
        </button>
        <FilterCheckbox
          onChange={handleCheckboxChange}
          isChecked={isCheckboxChecked}
        />
      </form>
    </section>
  );
}
