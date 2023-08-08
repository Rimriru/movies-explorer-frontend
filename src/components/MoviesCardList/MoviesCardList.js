import { useState } from "react";
import Preloader from "../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({ moviesArray, isListInSaved }) {
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState(16);

  const handlerMoreBtnClick = () => setMoviesToRender(moviesToRender + 4);

  return (
    <section className="movies-cards">
      <Preloader isVisible={isPreloaderVisible} />
      <ul className="movies-cards__list">
        {moviesArray.slice(0, moviesToRender).map((movie, i) => {
          return (
            <li>
              <MoviesCard
                key={i}
                title={movie.title}
                link={movie.link}
                duration={movie.duration}
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
