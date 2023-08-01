import MoviesCard from "../MoviesCard/MoviesCard";
import { moviesArray } from "../../utils/constants";
import "./MoviesCardList.css";

export default function MoviesCardList() {
  return (
    <section className="movies-cards">
      <div className="movies-cards__list">
        {moviesArray.slice(0, 16).map((movie, i) => {
          return (
            <MoviesCard
              key={i}
              title={movie.title}
              link={movie.link}
              duration={movie.duration}
            />
          );
        })}
      </div>
      <button className="movies-cards__btn">Ещё</button>
    </section>
  );
}
