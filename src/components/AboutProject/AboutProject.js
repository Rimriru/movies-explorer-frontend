import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="heading">О проекте</h2>
      <div className="info-table">
        <article>
          <h3 className="info-table__title">Дипломный проект включал 5 этапов</h3>
          <p className="info-table__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </article>
        <article>
          <h3 className="info-table__title">На выполнение диплома ушло 5 недель</h3>
          <p className="info-table__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </article>
      </div>
      <div className="about-project__graph">
        <div className="about-project__graph-item">
          <p className="about-project__graph-line about-project__graph-line_first">1 неделя</p>
          <p className="about-project__graph-text">Back-end</p>
        </div>
        <div className="about-project__graph-item">
          <p className="about-project__graph-line">4 недели</p>
          <p className="about-project__graph-text">Front-end</p>
        </div>
      </div>
    </section>
  );
}