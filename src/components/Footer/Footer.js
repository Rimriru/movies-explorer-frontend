import "./Footer.css";

export default function Footer() {
  const currentDate = new Date();

  return (
    <footer className="footer">
      <p className="footer__project-abstract">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className="footer__container">
        <p className="footer__text">{`© ${currentDate.getFullYear()}`}</p>
        <ul className="footer__links">
          <li>
            <a className="footer__link" href="https://practicum.yandex.ru/" target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
          </li>
          <li>
            <a className="footer__link" href="https://github.com/Rimriru" target="_blank" rel="noopener noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
