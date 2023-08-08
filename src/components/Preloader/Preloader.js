import "./Preloader.css";

export default function Preloader({ isVisible }) {
  return (
    <div className={`preloader ${isVisible ? "preloader_visible " : ""}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
}
