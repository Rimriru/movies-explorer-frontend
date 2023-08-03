import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <section className="not-found">
      <h2 className="not-found__heading">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link">Назад</Link>
    </section>
  );
};
