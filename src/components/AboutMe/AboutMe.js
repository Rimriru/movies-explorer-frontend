import "./AboutMe.css";
import photoPath from "../../images/maria-about-me.jpg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="heading">Студент</h2>
      <div className="about-me__info-box">
        <div className="about-me__info">
          <h3 className="about-me__title">Мария</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 24 года</p>
          <p className="about-me__text">
            Я родилась в Первоуральске, но за свою жизнь я успела побывать во многих городах России, а на данный момент проживаю в городе Минск республики Беларусь. Много лет я обучалась биологии и даже успела получить степень магистра в сфере нейронаук. Не так давно я увлеклась кодингом и в какой-то момент пришла к веб-разработке, училась самостоятельно и закончила курсы Веб-разработчика от Яндекс.Практикума. На данный момент я дорабатываю собственные проекты, совершенствую свои навыки и пытаюсь найти себя в фронтенд-разработке.
          </p>
          <a
            className="about-me__link"
            href="https://github.com/Rimriru"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <img
          className="about-me__photo"
          src={photoPath}
          alt="Фото разработчика"
        />
      </div>
    </section>
  );
}
