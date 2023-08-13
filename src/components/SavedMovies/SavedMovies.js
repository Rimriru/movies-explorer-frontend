import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import { savedMoviesArray } from "../../utils/constants.js";
import "./SavedMovies.css";

export default function SavedMovies({ moviesToRender }) {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList moviesArray={savedMoviesArray} isListInSaved={true} moviesToRender={moviesToRender}/>
    </main>
  );
};
