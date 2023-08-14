import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation } from "../../utils/formValidation";
import { useState, useEffect } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSubmit, previousSearchValue }) {
  const wasCheckboxChecked = localStorage.getItem("isCheckboxChecked");
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(wasCheckboxChecked !== null ? wasCheckboxChecked === 'true' : true);
  const formValidation = useFormWithValidation();
  const searchInputError = formValidation.errors.title;

  useEffect(() => {
    localStorage.setItem("isCheckboxChecked", JSON.stringify(isCheckboxChecked));
  }, [isCheckboxChecked]);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("title", formValidation.values.title);
    onSubmit(isCheckboxChecked);
  };

  const handleCheckboxChange = (e) => {
    setIsCheckboxChecked(e.target.checked);
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
