import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation }  from "../../utils/formValidation";
import { useState } from "react";
import "./SearchForm.css";

export default function SearchForm({ onSubmit }) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);
  const formValidation = useFormWithValidation();
  const searchInputError = formValidation.errors.title;

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("title", formValidation.values.title);
    localStorage.setItem("isCheckboxChecked", isCheckboxChecked);
    onSubmit();
  };

  const handleCheckboxClick = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  return (
    <section className="search">
      <form className="search__form" noValidate onSubmit={handleSubmit}>
        <div className="search__loupe"></div>
        <div className="search__container">
          <input className="search__input" placeholder="Фильм" name="title" required onChange={formValidation.handleChange}/>
          <span className={`search__error ${searchInputError ? "search__error_visible" : ""}`}>{`${searchInputError ? "Нужно ввести ключевое слово" : ""}`}</span>
        </div>
        <button className="search__submit-btn" type="submit" disabled={!formValidation.isValid}>
          Найти
        </button>
        <FilterCheckbox onClick={handleCheckboxClick} isChecked={isCheckboxChecked} />
      </form>
    </section>
  );
}
