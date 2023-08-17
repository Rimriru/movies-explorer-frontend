import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import "./SavedMovies.css";

export default function SavedMovies({ moviesToRender, savedMoviesArray, onDislike }) {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList isListInSaved={true} moviesToRender={moviesToRender} moviesArray={savedMoviesArray} onDislike={onDislike}/>
    </main>
  );
};
