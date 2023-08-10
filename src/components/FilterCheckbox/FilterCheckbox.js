import "./FilterCheckbox.css";

export default function FilterCheckbox() {


  // handleInputChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }
  return (
    <div className="filter-checkbox">
      <label className="filter-checkbox__switch">
        <input
          className="filter-checkbox__input"
          type="checkbox"
          id="short-film"
          defaultChecked
        ></input>
        <span className="filter-checkbox__slider"></span>
      </label>
      <label className="filter-checkbox__label" htmlFor="short-film">
        Короткометражки
      </label>
    </div>
  );
}
