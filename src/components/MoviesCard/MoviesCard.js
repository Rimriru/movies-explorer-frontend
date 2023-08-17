import { useState, useEffect } from "react";
import "./MoviesCard.css";

export default function MoviesCard({
  nameRU,
  nameEN,
  country,
  director,
  year,
  description,
  image,
  duration,
  trailerLink,
  isInSaved,
  onLike,
  onDislike,
  thumbnail,
  movieId,
  isLiked,
}) {
  const [isMovieCardLiked, setIsMovieCardLiked] = useState(false);
  const [isRemoveBtnVisible, setIsRemoveBtnVisible] = useState(false);
  const [likedMovieCardData, setlikedMovieCardData] = useState({});

  const countDuration = (durationInMins) => {
    const hours = Math.floor(durationInMins / 60);
    const minutes = durationInMins % 60;
    return { hours, minutes };
  };

  useEffect(() => {
    if (isLiked && !isInSaved) {
      setIsMovieCardLiked(true);
    }
  }, [isInSaved, isLiked]);

  const handleLikeBtnClick = () => {
    if (!isMovieCardLiked) {
      onLike({
        nameRU,
        nameEN,
        country,
        director,
        year,
        description,
        image,
        duration,
        trailerLink,
        thumbnail,
        movieId,
      }).then((movieDataInDb) => {
          setlikedMovieCardData(movieDataInDb);
          setIsMovieCardLiked(true);
          console.log(likedMovieCardData);
        })
        .catch(error =>  console.log(error));
    } else {
      onDislike(movieId);
      setIsMovieCardLiked(false);
      console.log(likedMovieCardData._id);
    }
  };

  const handleRemoveBtnClick = (e) => {
    console.log(movieId);
    onDislike(movieId);
    // e.target.closest(".movie-card").remove();
  };

  const handleMovieCardHoverOn = () => {
    setIsRemoveBtnVisible(true);
  };

  const handleMovieCardHoverOut = () => {
    setIsRemoveBtnVisible(false);
  };

  return (
    <article
      className="movie-card"
      onMouseEnter={handleMovieCardHoverOn}
      onMouseLeave={handleMovieCardHoverOut}
    >
      <a
        className="movie-card__trailer-link"
        href={trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img className="movie-card__image" src={image} alt={nameRU} />
      </a>
      <div className="movie-card__container">
        <h2 className="movie-card__title">{nameRU}</h2>
        <button
          className={`movie-card__like-btn ${
            isMovieCardLiked ? "movie-card__like-btn_type_active" : ""
          } ${isInSaved ? "movie-card__like-btn_type_remove" : ""} ${
            isInSaved && isRemoveBtnVisible
              ? "movie-card__like-btn_visible"
              : ""
          }`}
          onClick={isInSaved ? handleRemoveBtnClick : handleLikeBtnClick}
          type="button"
        ></button>
      </div>
      <p className="movie-card__duration">{`${countDuration(duration).hours}ч ${
        countDuration(duration).minutes
      }м`}</p>
    </article>
  );
}
