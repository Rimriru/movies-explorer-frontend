import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import { NOT_FOUND_ERROR_MESSAGE } from "../../utils/constants.js";
import { useEffect } from "react";
import "./SavedMovies.css";

export default function SavedMovies({ moviesToRender, moviesArray, isNotFoundErrorShown, isTabOrMobile, changeTheSavedAtRender, onDislike, onSubmit, onChange }) {
  useEffect(() => {
    changeTheSavedAtRender();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {NOT_FOUND_ERROR_MESSAGE}
        </span>
    </main>
  );
};
