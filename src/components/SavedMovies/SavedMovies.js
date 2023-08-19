import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import "./SavedMovies.css";

export default function SavedMovies({ moviesToRender, savedMoviesArray, isTabOrMobile, onDislike }) {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList isListInSaved={true} moviesToRender={moviesToRender} moviesArray={savedMoviesArray} isTabOrMobile={isTabOrMobile} onDislike={onDislike}/>
    </main>
  );
};
