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
import useWindowResize from "../../utils/windowResize";
import mainApi from "../../utils/mainApi.js";
import moviesApi from "../../utils/moviesApi.js";
import ProtectedRouteElement from "../ProtectedRoute.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [error, setError] = useState("");
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);
  const [isApiErrorShown, setIsApiErrorShown] = useState(false);
  const [isNotFoundErrorShown, setIsNotFoundErrorShown] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState(16);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const { isDesktop, isTab, isMobile } = useWindowResize();

  useEffect(() => {
    if (isDesktop) {
      setMoviesToRender(16);
    } else if (isTab) {
      setMoviesToRender(8);
    } else if (isMobile) {
      setMoviesToRender(5);
    }
  }, [isDesktop, isTab, isMobile]);

  const filterMovieOnDuration = (isCheckboxChecked, duration) => {
    return isCheckboxChecked ? duration <= 40 : duration > 40;
  };

  const filterMovieArray = (arr, isCheckboxChecked) => {
    const searchMovieTitleLowered = localStorage.getItem("title").toLowerCase();
    const isTitleLatin = /[a-z]/.test(searchMovieTitleLowered);
    if (arr) {
      const filteredMovieArray = arr.filter(
        (movie) =>
          (isTitleLatin ? movie.nameEN : movie.nameRU)
            .toLowerCase()
            .includes(searchMovieTitleLowered) &&
          filterMovieOnDuration(isCheckboxChecked, movie.duration)
      );
      if (filteredMovieArray.length === 0) {
        setIsPreloaderVisible(false);
        setIsNotFoundErrorShown(true);
        return filteredMovieArray;
      } else {
        return filteredMovieArray;
      }
    }
  };

  const handleSignOutBtnClick = () => {
    mainApi
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.clear();
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

  const handleMoreBtnClick = () =>
    isDesktop
      ? setMoviesToRender(moviesToRender + 4)
      : setMoviesToRender(moviesToRender + 2);

  const handleSearchFormSubmit = (isCheckboxChecked) => {
    setIsNotFoundErrorShown(false);
    setIsPreloaderVisible(true);
    setFilteredMoviesArray([]);
    localStorage.setItem("filteredMoviesArray", null);
    moviesApi
      .getMovies()
      .then((res) => {
        // console.log(res);
        const filteredArray = filterMovieArray(res, isCheckboxChecked);
        setFilteredMoviesArray(filteredArray);
        localStorage.setItem("filteredMoviesArray", JSON.stringify(filteredArray));
        setIsPreloaderVisible(false);
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
              moviesArray={filteredMoviesArray}
              isApiErrorShown={isApiErrorShown}
              isNotFoundErrorShown={isNotFoundErrorShown}
              moviesToRender={moviesToRender}
              onSubmit={handleSearchFormSubmit}
              onClick={handleMoreBtnClick}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteElement
              loggedIn={isLoggedIn}
              element={SavedMovies}
              moviesToRender={moviesToRender}
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
