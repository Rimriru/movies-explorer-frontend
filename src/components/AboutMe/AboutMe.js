import "./AboutMe.css";
import photoPath from "../../images/vitaly-about-me.jpg";

export default function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="heading">Студент</h2>
      <div className="about-me__info-box">
        <div className="about-me__info">
          <h3 className="about-me__title">Виталий</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 30 лет</p>
          <p className="about-me__text">
            Я родился и живу в Саратове, закончил факультет
            экономики СГУ. У меня есть жена и дочь. Я люблю слушать
            музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
            С 2015 года работал в компании «СКБ Контур». После того, 
            как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
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
