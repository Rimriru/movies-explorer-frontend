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
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { headerRoutes, footerRoutes } from "../../utils/constants.js";
import useWindowResize from "../../utils/windowResize";
import mainApi from "../../utils/mainApi.js";
import moviesApi from "../../utils/moviesApi.js";
import ProtectedRouteElement from "../ProtectedRoute.js";
import { showMovieArray, isCardLiked } from "../../utils/movieFilter.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [savedMoviesArray, setSavedMoviesArray] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);
  const [isApiErrorShown, setIsApiErrorShown] = useState(false);
  const [isNotFoundErrorShown, setIsNotFoundErrorShown] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState(16);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const { isDesktop, isTabOrMobile, isTab, isMobile } = useWindowResize();

  useEffect(() => {
    checkToken();
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToken = () => {
    mainApi
      .getUserInfo()
      .then((res) => {
        if(res.message) {
          setIsLoggedIn(false);
          navigate("/signin");
        } else {
          setCurrentUser(res);
          setIsLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoggedIn(false);
        navigate("/signin");
      });
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

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserMovies()
        .then((res) => {
          if (Array.isArray(res)) {
            setSavedMoviesArray(res);
          } else if (res.message && res.statusCode === 404) {
            setSavedMoviesArray([]);
          }
        })
        .catch((error) => console.log(error));
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    isCardLiked(savedMoviesArray, filteredMoviesArray);
  }, [savedMoviesArray, filteredMoviesArray]);

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
      .then((res) => {
        if (res.status !== 200) {
          setError(res.message || 'При регистрации пользователя произошла ошибка.');
          return;
        } else {
          navigate("/signin");
          return; 
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleLoginFormSubmit = ({ email, password }) => {
    mainApi
      .login({ email, password })
      .then((res) => {
        if (res.status !== 200) {
          setError(res.message || 'При авторизации произошла ошибка.');
          return;
        } else {
          setIsLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleUserDataUpdate = (userData) => {
    mainApi.updateUserInfo(userData).then(res => {
      if (res.status !== 200) {
        setError(res.message || 'При обновлении профиля произошла ошибка.');
        return;
      } else {
        setError("");
        setCurrentUser(res);
      }
    }).catch(error => {
      console.log(error);
    });
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
        const filteredArray = showMovieArray(res, isCheckboxChecked);
        if (filteredArray.length === 0) {
          setIsNotFoundErrorShown(true);
        }
        setIsPreloaderVisible(false);
        setFilteredMoviesArray(filteredArray);
        localStorage.setItem(
          "filteredMoviesArray",
          JSON.stringify(filteredArray)
        );
      })
      .catch(() => {
        setIsPreloaderVisible(false);
        setIsApiErrorShown(true);
      });
  };

  const handleLikeBtnClick = async (movieData) => {
    const newSavedMovie = await mainApi
      .addUserMovie(movieData)
      .then((res) => res)
      .catch(console.error);
    setSavedMoviesArray((state) => [...state, newSavedMovie]);
    return newSavedMovie;
  };

  const handleDislikeBtnClick = (movieId) => {
    const movieInSaved = savedMoviesArray.find(
      (savedMovie) => savedMovie.movieId === movieId
    );
    return mainApi
      .removeUserMovie(movieInSaved._id)
      .then(() => {
        setSavedMoviesArray((state) =>
          state.filter((movie) => movie._id !== movieInSaved._id)
        );
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {headerRoutes.find((route) => currentLocation.pathname === route) && (
        <Header isLoggedIn={isLoggedIn} />
      )}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route
          path="/movies"
          element={
            isLoggedIn ? (
              <ProtectedRouteElement
                loggedIn={isLoggedIn}
                element={Movies}
                isPreloaderVisible={isPreloaderVisible}
                moviesArray={filteredMoviesArray}
                isApiErrorShown={isApiErrorShown}
                isNotFoundErrorShown={isNotFoundErrorShown}
                moviesToRender={moviesToRender}
                savedMoviesArray={savedMoviesArray}
                onSubmit={handleSearchFormSubmit}
                onClick={handleMoreBtnClick}
                onLike={handleLikeBtnClick}
                onDislike={handleDislikeBtnClick}
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/saved-movies"
          element={
            isLoggedIn ? (
              <ProtectedRouteElement
                loggedIn={isLoggedIn}
                element={SavedMovies}
                moviesToRender={moviesToRender}
                savedMoviesArray={savedMoviesArray}
                isTabOrMobile={isTabOrMobile}
                onDislike={handleDislikeBtnClick}
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <ProtectedRouteElement
                loggedIn={isLoggedIn}
                element={Profile}
                onSignOut={handleSignOutBtnClick}
                onSubmit={handleUserDataUpdate}
                error={error}
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={<Register onSubmit={handleRegisterFormSubmit} error={error} />}
        />
        <Route
          path="/signin"
          element={<Login onSubmit={handleLoginFormSubmit} error={error} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {footerRoutes.find((route) => currentLocation.pathname === route) && (
        <Footer />
      )}
    </CurrentUserContext.Provider>
  );
}

export default App;
