import SearchForm from "../SearchForm/SearchForm.js";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import Preloader from "../Preloader/Preloader";
import "./Movies.css";

export default function Movies({ isPreloaderVisible, moviesArray, isApiErrorShown, isNotFoundErrorShown, onSubmit }) {
  return (
    <main className="movies">
      <SearchForm onSubmit={onSubmit} />
      <MoviesCardList moviesArray={moviesArray} />
      <Preloader isVisible={isPreloaderVisible} />
      <span className={`movies__error ${isApiErrorShown ? "movies__error_visible" : ""}`}>Во время запроса произошла ошибка.
      Возможно, проблема с соединением или сервер недоступен. 
      Подождите немного и попробуйте ещё раз.
      </span>
      {/* <span className={`movies__error ${isApiErrorShown ? "movies__error_visible" : ""}`}>Во время запроса произошла ошибка.
      Возможно, проблема с соединением или сервер недоступен. 
      Подождите немного и попробуйте ещё раз. // NotFound Error :C
      </span> */}
    </main>
  );
};
