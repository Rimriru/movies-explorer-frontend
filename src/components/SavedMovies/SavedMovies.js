import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import "./SavedMovies.css";

export default function SavedMovies({ moviesToRender }) {
  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList isListInSaved={true} moviesToRender={moviesToRender}/>
    </main>
  );
};
