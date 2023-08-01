import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import "./Movies.css";

export default function Movies() {
  return (
    <>
      <SearchForm/>
      <MoviesCardList/>
    </>
  );
};
