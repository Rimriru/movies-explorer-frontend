import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import { moviesArray } from "../../utils/constants";
import "./Movies.css";

export default function Movies() {
  return (
    <main>
      <SearchForm/>
      <MoviesCardList moviesArray={moviesArray}/>
    </main>
  );
};
