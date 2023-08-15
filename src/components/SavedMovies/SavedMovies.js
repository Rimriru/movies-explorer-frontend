import { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList.js";
import SearchForm from "../SearchForm/SearchForm.js";
import mainApi from "../../utils/mainApi.js";
import "./SavedMovies.css";

export default function SavedMovies({ moviesToRender }) {
  const [savedMoviesArray, setSavedMoviesArray] = useState([]);

  useEffect(() => {
    mainApi.getUserMovies().then(res => {
      setSavedMoviesArray(res);
    }).catch(console.error);
  }, []);

  return (
    <main className="saved-movies">
      <SearchForm/>
      <MoviesCardList isListInSaved={true} moviesToRender={moviesToRender} moviesArray={savedMoviesArray}/>
    </main>
  );
};
