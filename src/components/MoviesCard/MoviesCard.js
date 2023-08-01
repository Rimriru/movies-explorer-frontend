import "./MoviesCard.css";

export default function MoviesCard({ title, link, duration }) {
  return (
    <article className="movie-card">
      <img className="movie-card__image" src={link} alt={title}/>
      <div className="movie-card__container">
        <h2 className="movie-card__title">{title}</h2>
        <button className="movie-card__like-btn"></button>
      </div>
      <p className="movie-card__duration">{duration}</p>
    </article>
  );
};
