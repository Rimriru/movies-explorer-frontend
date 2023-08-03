import { useState } from "react";
import "./MoviesCard.css";

export default function MoviesCard({ title, link, duration, isInSaved }) {
  const [isMovieCardLiked, setIsMovieCardLiked] = useState(false);
  const [isRemoveBtnVisible, setIsRemoveBtnVisible] = useState(false);

  const handleLikeBtnClick = () => {
    setIsMovieCardLiked(!isMovieCardLiked);
  };

  const handleRemoveBtnClick = (e) => {
    e.target.closest('.movie-card').remove();
  };

  const handleMovieCardHoverOn = () => {
    setIsRemoveBtnVisible(true);
  };

  const handleMovieCardHoverOut = () => {
    setIsRemoveBtnVisible(false);
  };

  return (
    <article className="movie-card" onMouseEnter={handleMovieCardHoverOn} onMouseLeave={handleMovieCardHoverOut}>
      <img className="movie-card__image" src={link} alt={title}/>
      <div className="movie-card__container">
        <h2 className="movie-card__title">{title}</h2>
        <button className={`movie-card__like-btn ${isMovieCardLiked ? "movie-card__like-btn_type_active" : ""} ${isInSaved ? "movie-card__like-btn_type_remove" : ""} ${isInSaved && isRemoveBtnVisible ? "movie-card__like-btn_visible" : ""}`} onClick={isInSaved ? handleRemoveBtnClick : handleLikeBtnClick}></button>
      </div>
      <p className="movie-card__duration">{duration}</p>
    </article>
  );
};
