import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import { savedMoviesArray } from "../../utils/constants.js";
import "./SavedMovies.css";

export default function SavedMovies() {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList moviesArray={savedMoviesArray} isListInSaved={true}/>
    </main>
  );
};
