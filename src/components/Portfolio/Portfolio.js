import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__list">
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://rimriru.github.io/how-to-learn/#" target="_blank" rel="noopener noreferrer">Статичный сайт<div className="portfolio__arrow"></div></a>
          {/* <div className="portfolio__arrow"></div> */}
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://rimriru.github.io/russian-travel/" target="_blank" rel="noopener noreferrer">Адаптивный сайт<div className="portfolio__arrow"></div></a>
          {/* <div className="portfolio__arrow"></div> */}
        </li>
        <li className="portfolio__list-item">
          <a className="portfolio__link" href="https://rimriru.github.io/mesto-react/" target="_blank" rel="noopener noreferrer">Одностраничное приложение<div className="portfolio__arrow"></div></a>
          {/* <div className="portfolio__arrow"></div> */}
        </li>
      </ul>
    </section>
  );
};
