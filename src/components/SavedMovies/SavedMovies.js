import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import { notFoundErrorMessage } from "../../utils/constants.js";
import "./SavedMovies.css";

export default function SavedMovies({ moviesToRender, moviesArray, isNotFoundErrorShown, isTabOrMobile, onDislike, onSubmit, onChange }) {
  return (
    <main className="saved-movies">
      <SearchForm isInSaved={true} onSubmit={onSubmit} onChange={onChange} />
      <MoviesCardList isListInSaved={true} moviesToRender={moviesToRender} moviesArray={moviesArray} isTabOrMobile={isTabOrMobile} onDislike={onDislike}/>
      <span
          className={`movies__error ${isNotFoundErrorShown
              ?
                "movies__error_visible"
              : ""
          }`}
        >
          {notFoundErrorMessage}
        </span>
    </main>
  );
};
