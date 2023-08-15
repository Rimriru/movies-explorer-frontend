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
import showMovieArray from "../../utils/movieFilter.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
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
    checkToken();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToken = () => {
    const token = document.cookie.jwt;
    console.log(document.cookie);
    if(token) {
      setIsLoggedIn(true);
      navigate('/movies');
      mainApi.getUserInfo().then(res => {
        setCurrentUser(res);
      }).catch(console.error);
    }
  };

  useEffect(() => {
    if (isDesktop) {
      setMoviesToRender(16);
    } else if (isTab) {
      setMoviesToRender(8);
    } else if (isMobile) {
      setMoviesToRender(5);
    }
  }, [isDesktop, isTab, isMobile]);


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
      .catch((err) => setError(err.message));
  };

  const handleLoginFormSubmit = ({ email, password }) => {
    mainApi
      .login({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        navigate("/movies");
      })
      .catch((err) => setError(err.message));
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
        console.log(res);
        const filteredArray = showMovieArray(res, isCheckboxChecked);
        if (filteredArray.length === 0) {
          setIsNotFoundErrorShown(true);
        }
        setIsPreloaderVisible(false);
        setFilteredMoviesArray(filteredArray);
        localStorage.setItem("filteredMoviesArray", JSON.stringify(filteredArray));
      })
      .catch(() => {
        setIsPreloaderVisible(false);
        setIsApiErrorShown(true);
      });
  };

  const handleLikeBtnClick = (movieData) => {
    mainApi.addUserMovie(movieData).then().catch((err) => setError(err.message));
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
              onLike={handleLikeBtnClick}
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
