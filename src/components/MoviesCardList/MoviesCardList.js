import { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ moviesArray, isListInSaved }) {
  const [moviesToRender, setMoviesToRender] = useState(16);

  const countDuration = (durationInMins) => {
    const hours = Math.floor(durationInMins/60);
    const minutes = durationInMins % 60;
    return { hours, minutes }
  };

  const handlerMoreBtnClick = () => setMoviesToRender(moviesToRender + 4);

  return (
    <section className={`movies-cards ${moviesArray.length !== 0 ? "movies-cards_visible" : ""}`}>
      <ul className="movies-cards__list">
        {moviesArray.length !== 0 && moviesArray.slice(0, moviesToRender).map((movie) => {
          return (
            <li key={movie.id}>
              <MoviesCard
                title={movie.nameRU}
                link={`https://api.nomoreparties.co/${movie.image.url}`}
                duration={`${countDuration(movie.duration).hours}ч ${countDuration(movie.duration).minutes}м`}
                isInSaved={isListInSaved}
              />
            </li>
          );
        })}
      </ul>
      {moviesArray.length > moviesToRender && (
        <button className="movies-cards__btn" onClick={handlerMoreBtnClick} type="button">
          Ещё
        </button>
      )}
    </section>
  );
}
