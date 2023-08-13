import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";
import { useEffect, useState } from "react";

export default function Movies({ isPreloaderVisible, moviesArray, isApiErrorShown, isNotFoundErrorShown, onSubmit, onClick, moviesToRender }) {
  const [previousSearch, setPreviousSearch] = useState({});

  useEffect(() => {
    const previousFilteredMoviesArray = localStorage.getItem("filteredMoviesArray");
    const previousSearchMovieTitle = localStorage.getItem("title");
    const wasCheckboxChecked = localStorage.getItem("isCheckboxChecked");
    setPreviousSearch({ 
      title: previousSearchMovieTitle, 
      wasChecked: wasCheckboxChecked, 
      moviesArray: previousFilteredMoviesArray,
    });
  }, []);

  return (
    <main className="movies">
      <SearchForm onSubmit={onSubmit} previousSearchValue={previousSearch.title} wasChecked={previousSearch.wasChecked} />
      {(previousSearch.moviesArray || moviesArray) && <MoviesCardList moviesArray={previousSearch.moviesArray || moviesArray} isListInSaved={false} moviesToRender={moviesToRender} onClick={onClick} />}
      <Preloader isVisible={isPreloaderVisible} />
      <span className={`movies__error ${isApiErrorShown ? "movies__error_visible" : ""}`}>Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.
      </span>
      <span className={`movies__error ${isNotFoundErrorShown ? "movies__error_visible" : ""}`}>Ничего не найдено
      </span>
    </main>
  );
};
