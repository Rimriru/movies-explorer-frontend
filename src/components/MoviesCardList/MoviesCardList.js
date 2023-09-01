import MoviesCard from "../MoviesCard/MoviesCard";
// import { useState, useEffect } from "react";
import "./MoviesCardList.css";

export default function MoviesCardList({ moviesArray, isListInSaved, moviesToRender, onClick, onLike, onDislike, isTabOrMobile }) {
  return (
    <section className={`movies-cards ${moviesArray.length !== 0 ? "movies-cards_visible" : ""}`}>
      <ul className="movies-cards__list">
        {moviesArray && moviesArray.slice(0, moviesToRender).map((movie) => {
          return (
            <li key={isListInSaved? movie.movieId : movie.id}>
              <MoviesCard
                nameRU={movie.nameRU}
                nameEN={movie.nameEN}
                trailerLink={movie.trailerLink}
                image={isListInSaved ? movie.image : `https://api.nomoreparties.co/${movie.image.url}`}
                duration={movie.duration}
                country={movie.country}
                director={movie.director}
                year={movie.year}
                description={movie.description}
                thumbnail={isListInSaved ? movie.thumbnail : `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`}
                movieId={isListInSaved? movie.movieId : movie.id}
                isLiked={movie.isLiked}
                isInSaved={isListInSaved}
                isTabOrMobile={isTabOrMobile}
                onLike={onLike}
                onDislike={onDislike}
              />
            </li>
          );
        })}
      </ul>
      {!isListInSaved && moviesArray.length > moviesToRender && (
        <button className="movies-cards__btn" onClick={onClick} type="button">
          Ещё
        </button>
      )}
    </section>
  );
}
