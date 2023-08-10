import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormWithValidation }  from "../../utils/formValidation";
import "./SearchForm.css";

export default function SearchForm() {
  const formValidation = useFormWithValidation();
  const searchInputError = formValidation.errors.search;

  return (
    <section className="search">
      <form className="search__form">
        <div className="search__loupe"></div>
        <div className="search__container">
          <input className="search__input" placeholder="Фильм" name="search" required onChange={formValidation.handleChange}/>
          <span className={`search__error ${searchInputError ? "search__error_visible" : ""}`}>{`${searchInputError ? "Нужно ввести ключевое слово" : ""}`}</span>
        </div>
        <button className="search__submit-btn" type="submit" disabled={!formValidation.isValid}>
          Найти
        </button>
        <FilterCheckbox />
      </form>
    </section>
  );
}
