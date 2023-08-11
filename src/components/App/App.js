import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import NotFound from "../NotFound/NotFound.js";
import Footer from "../Footer/Footer.js";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { headerRoutes, footerRoutes } from "../../utils/constants.js";
import mainApi from "../../utils/mainApi.js";
import moviesApi from "../../utils/moviesApi.js";
import ProtectedRouteElement from "../ProtectedRoute.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [moviesArray, setMoviesArray] = useState([]);
  const [isApiErrorShown, setIsApiErrorShown] = useState(false);
  const [isNotFoundErrorShown, setIsNotFoundErrorShown] = useState(false);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const filterMovieOnDuration = (duration) => {
    const isShortFilm = localStorage.getItem('isCheckboxChecked');
    return isShortFilm ? duration <= 40 : duration > 40;
  };

  const filterMovieArray = (arr) => {
    return arr.filter(movie => movie.nameRU.includes(localStorage.getItem('title')) && filterMovieOnDuration(movie.duration));
  };

  useEffect(() => {
    if(moviesArray.length === 0) {
      setIsNotFoundErrorShown(true);
    }
  }, [moviesArray]);

  const handleSignOutBtnClick = () => {
    mainApi
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleRegisterFormSubmit = ({ email, name, password }) => {
    mainApi
      .register({ email, name, password })
      .then(() => navigate("/signin"))
      .catch(console.error);
  };

  const handleLoginFormSubmit = ({ email, password }) => {
    mainApi
      .login({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch(console.error);
  };

  const handleSearchFormSubmit = () => {
    setIsPreloaderVisible(true);
    moviesApi
      .getMovies()
      .then(res => {
        // setMoviesArray(res);
        console.log(res);
        const filteredArray = filterMovieArray(res);
        setMoviesArray(filteredArray);
        console.log(moviesArray);
      })
      .catch(() => {
        setIsPreloaderVisible(false);
        setIsApiErrorShown(true);
      });
  };

  return (
    <>
      {headerRoutes.find((route) => currentLocation.pathname === route) && (
        <Header isLoggedIn={isLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement
              loggedIn={isLoggedIn}
              element={Movies}
              isPreloaderVisible={isPreloaderVisible}
              moviesArray={moviesArray}
              isApiErrorShown={isApiErrorShown}
              isNotFoundErrorShown={isNotFoundErrorShown}
              onSubmit={handleSearchFormSubmit}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteElement
              loggedIn={isLoggedIn}
              element={SavedMovies}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement
              loggedIn={isLoggedIn}
              element={Profile}
              onSignOut={handleSignOutBtnClick}
              error={error}
            />
          }
        />
        <Route
          path="/signup"
          element={<Register onSubmit={handleRegisterFormSubmit} />}
        />
        <Route
          path="/signin"
          element={<Login onSubmit={handleLoginFormSubmit} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {footerRoutes.find((route) => currentLocation.pathname === route) && (
        <Footer />
      )}
    </>
  );
}

export default App;
