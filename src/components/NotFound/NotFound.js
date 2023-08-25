import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate('/movies', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return (
    <section className="not-found">
      <h1 className="not-found__heading">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__button" onClick={handleClick}>Назад</button>
    </section>
  );
};
