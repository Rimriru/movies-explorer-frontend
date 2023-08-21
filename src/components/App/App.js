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
import { showMovieArray } from "../../utils/movieFilter.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState("");
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(false);
  const [originalMoviesArray, setOriginalMoviesArray] = useState([]);
  const [filteredMoviesArray, setFilteredMoviesArray] = useState([]);
  const [savedMoviesArray, setSavedMoviesArray] = useState([]);
  const [filteredSavedMoviesArray, setFilteredSavedMoviesArray] = useState([]);
  const [isApiErrorShown, setIsApiErrorShown] = useState(false);
  const [isNotFoundErrorShown, setIsNotFoundErrorShown] = useState(false);
  const [moviesToRender, setMoviesToRender] = useState(16);
  const currentLocation = useLocation();
  const navigate = useNavigate();

  const { isDesktop, isTabOrMobile, isTab, isMobile } = useWindowResize();

  useEffect(() => {
    checkToken();
    console.log(checkToken());
    setError("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkToken = () => {
    mainApi
      .getUserInfo()
      .then((res) => {
        if (res.message) {
          setIsLoggedIn(false);
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
  }, [isDesktop, isTab, isMobile, filteredMoviesArray]);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserMovies()
        .then((res) => {
          if (Array.isArray(res)) {
            setSavedMoviesArray(res);
            setFilteredSavedMoviesArray(res);
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
    setFilteredSavedMoviesArray(savedMoviesArray);
  }, [savedMoviesArray]);

  const handleSignOutBtnClick = () => {
    mainApi
      .logout()
      .then(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        setSavedMoviesArray([]);
        setCurrentUser({});
        navigate("/");
      })
      .catch((err) => setError(err.message));
  };

  const handleRegisterFormSubmit = ({ email, name, password }) => {
    mainApi
      .register({ email, name, password })
      .then((res) => {
        if (res.message) {
          setError(
            res.message || "При регистрации пользователя произошла ошибка."
          );
        } else {
          navigate("/signin");
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleLoginFormSubmit = ({ email, password }) => {
    mainApi
      .login({ email, password })
      .then((res) => {
        if (res.message !== "Вы успешно залогинились!") {
          setError(res.message || "При авторизации произошла ошибка.");
        } else {
          checkToken();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUserDataUpdate = (userData) => {
    mainApi
      .updateUserInfo(userData)
      .then((res) => {
        if (res.message) {
          setError(res.message || "При обновлении профиля произошла ошибка.");
        } else {
          setError("");
          setCurrentUser(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMoreBtnClick = () =>
    isDesktop
      ? setMoviesToRender(moviesToRender + 4)
      : setMoviesToRender(moviesToRender + 2);

  const handleMoviesSearchFormFilter = async (title, isCheckboxChecked) => {
    try {
      setIsPreloaderVisible(true);
      setIsNotFoundErrorShown(false);
      setFilteredMoviesArray([]);
      localStorage.setItem("filteredMoviesArray", null);
      const originalMovies = originalMoviesArray.length === 0 ? 
        await moviesApi.getMovies() :
        originalMoviesArray;
  
      setOriginalMoviesArray(originalMovies);
      
      const filteredArray = showMovieArray(
        originalMovies,
        title,
        isCheckboxChecked
      );
      if (filteredArray.length === 0) {
        setIsNotFoundErrorShown(true);
      }
      console.log(filteredArray);
      setFilteredMoviesArray(filteredArray);
      localStorage.setItem(
        "filteredMoviesArray",
        JSON.stringify(filteredArray)
      );
    } catch (error) {
      setIsApiErrorShown(true);
    } finally {
      setIsPreloaderVisible(false);
    }
  };

  const handleSavedMoviesSearchFormFilter = (title, isCheckboxChecked) => {
    setIsNotFoundErrorShown(false);
    const filteredSavedMovies = showMovieArray(savedMoviesArray, title, isCheckboxChecked);
    if (filteredSavedMovies.length === 0) {
      setIsNotFoundErrorShown(true);
    }
    setFilteredSavedMoviesArray(filteredSavedMovies);
  }

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

  const handleValidatedInputChange = () => {
    setError("");
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
                originalMoviesArray={originalMoviesArray}
                moviesArray={filteredMoviesArray}
                isApiErrorShown={isApiErrorShown}
                isNotFoundErrorShown={isNotFoundErrorShown}
                moviesToRender={moviesToRender}
                savedMoviesArray={savedMoviesArray}
                onSubmit={handleMoviesSearchFormFilter}
                onChange={handleMoviesSearchFormFilter}
                onClick={handleMoreBtnClick}
                onLike={handleLikeBtnClick}
                onDislike={handleDislikeBtnClick}
              />
            ) : (
              <Navigate to="/" replace />
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
                moviesArray={filteredSavedMoviesArray}
                isNotFoundErrorShown={isNotFoundErrorShown}
                isTabOrMobile={isTabOrMobile}
                onDislike={handleDislikeBtnClick}
                onSubmit={handleSavedMoviesSearchFormFilter}
                onChange={handleSavedMoviesSearchFormFilter}
              />
            ) : (
              <Navigate to="/" replace />
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
                onChange={handleValidatedInputChange}
                error={error}
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            <Register
              onSubmit={handleRegisterFormSubmit}
              onChange={handleValidatedInputChange}
              error={error}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <Login
              onSubmit={handleLoginFormSubmit}
              onChange={handleValidatedInputChange}
              error={error}
            />
          }
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
