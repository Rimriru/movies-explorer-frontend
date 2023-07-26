import "./Promo.css";

export default function Promo({ children }) {
  return(
    <div className="promo">
      {children}
      <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__art"></div>
    </div>
  );
};