import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import { savedMoviesArray } from "../../utils/constants.js";

export default function SavedMovies() {
  return (
    <main>
      <SearchForm/>
      <MoviesCardList moviesArray={savedMoviesArray} isListInSaved={true}/>
    </main>
  );
};
