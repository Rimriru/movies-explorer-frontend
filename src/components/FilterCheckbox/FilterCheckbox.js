import "./FilterCheckbox.css";

export default function FilterCheckbox({ onChange, isChecked, wasChecked }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          id="short-film"
          onChange={onChange}
          checked={isChecked}
        />
        <span className="filter-checkbox__slider"></span>
      </label>
      <label className="filter-checkbox__label" htmlFor="short-film">
        Короткометражки
      </label>
    </div>
  );
}
