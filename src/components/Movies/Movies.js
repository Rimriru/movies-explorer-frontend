import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import {
  moviesApiErrorMessage,
  notFoundErrorMessage,
} from "../../utils/constants.js";
import "./Movies.css";

export default function Movies({
  isPreloaderVisible,
  moviesArray,
  isApiErrorShown,
  isNotFoundErrorShown,
  onSubmit,
  onClick,
  moviesToRender,
}) {
  const [previousSearch, setPreviousSearch] = useState({
    title: "",
    moviesArray: [],
  });

  useEffect(() => {
    let previousFilteredMoviesArray = localStorage.getItem(
      "filteredMoviesArray"
    );
    let previousSearchMovieTitle = localStorage.getItem("title");
    try {
      if (previousFilteredMoviesArray !== null) {
        previousFilteredMoviesArray = JSON.parse(
          localStorage.getItem("filteredMoviesArray")
        );
      } else if (previousSearchMovieTitle === null) {
        previousSearchMovieTitle = "";
      }
    } catch (error) {
      console.log(error);
      previousFilteredMoviesArray = [];
    }
    setPreviousSearch({
      title: previousSearchMovieTitle,
      moviesArray: previousFilteredMoviesArray || moviesArray,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesArray]);

  return (
    <main className="movies">
      <SearchForm
        onSubmit={onSubmit}
        previousSearchValue={previousSearch.title}
      />
      {previousSearch.moviesArray && (
        <MoviesCardList
          moviesArray={previousSearch.moviesArray}
          isListInSaved={false}
          moviesToRender={moviesToRender}
          onClick={onClick}
        />
      )}
      {isPreloaderVisible ? (
        <Preloader isVisible={isPreloaderVisible} />
      ) : (
        <span
          className={`movies__error ${
            isApiErrorShown ||
            isNotFoundErrorShown ||
            previousSearch.moviesArray.length === 0
              ? "movies__error_visible"
              : ""
          }`}
        >
          {isApiErrorShown
            ? `${moviesApiErrorMessage}`
            : `${notFoundErrorMessage}`}
        </span>
      )}
    </main>
  );
}
