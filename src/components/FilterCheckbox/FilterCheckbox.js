import "./FilterCheckbox.css";

export default function FilterCheckbox({ onClick, isChecked }) {
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          id="short-film"
          onClick={onClick}
          defaultChecked={isChecked}
        />
        <span className="filter-checkbox__slider"></span>
      </label>
      <label className="filter-checkbox__label" htmlFor="short-film">
        Короткометражки
      </label>
    </div>
  );
}
