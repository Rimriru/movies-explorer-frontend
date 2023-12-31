import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader";
import { useEffect, useState } from "react";
import {
  MOVIES_API_ERROR_MESSAGE,
  NOT_FOUND_ERROR_MESSAGE,
} from "../../utils/constants.js";
import "./Movies.css";
import { isCardLiked } from "../../utils/movieFilter.js";

export default function Movies({
  isPreloaderVisible,
  moviesArray,
  isApiErrorShown,
  isNotFoundErrorShown,
  onSubmit,
  onChange,
  onClick,
  onLike,
  onDislike,
  moviesToRender,
  savedMoviesArray,
}) {
  const [previousSearch, setPreviousSearch] = useState({
    title: "",
    moviesArray: [],
  });

  const wasCheckboxChecked = localStorage.getItem("isCheckboxChecked");

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
      moviesArray: previousFilteredMoviesArray,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [moviesArray]);

  const handleCheckboxChange = (title, isChecked) => {
    onChange(title, isChecked);
  };

  return (
    <main className="movies">
      <SearchForm
        isInSaved={false}
        onSubmit={onSubmit}
        onChange={handleCheckboxChange}
        previousSearchValue={previousSearch.title}
        wasCheckboxChecked={wasCheckboxChecked}
      />
      {previousSearch.moviesArray && (
        <MoviesCardList
          moviesArray={isCardLiked(savedMoviesArray, previousSearch.moviesArray)}
          isListInSaved={false}
          moviesToRender={moviesToRender}
          savedMoviesArray={savedMoviesArray}
          onClick={onClick}
          onLike={onLike}
          onDislike={onDislike}
        />
      )}
      {isPreloaderVisible ? (
        <Preloader isVisible={isPreloaderVisible} />
      ) : (
        <span
          className={`movies__error ${
            isApiErrorShown || isNotFoundErrorShown
              ?
                "movies__error_visible"
              : ""
          }`}
        >
          {isApiErrorShown
            ? `${MOVIES_API_ERROR_MESSAGE}`
            : `${NOT_FOUND_ERROR_MESSAGE}`}
        </span>
      )}
    </main>
  );
}
