import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigation = useNavigate();

  const handleBackLinkClick = () => navigation(-1, { replace: true });

  return (
    <section className="not-found">
      <h2 className="not-found__heading">404</h2>
      <p className="not-found__text">Страница не найдена</p>
      <Link className="not-found__link" onClick={handleBackLinkClick}>Назад</Link>
    </section>
  );
};
