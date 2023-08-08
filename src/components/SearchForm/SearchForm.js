import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

export default function SearchForm() {
  return (
    <section className="search">
      <form className="search__form">
        <div className="search__loupe"></div>
        <input className="search__input" placeholder="Фильм" required></input>
        <button className="search__submit-btn" type="submit">
          Найти
        </button>
        <FilterCheckbox/>
      </form>
    </section>
  );
}
