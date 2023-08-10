import './App.css';
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from '../Login/Login.js';
import NotFound from '../NotFound/NotFound.js';
import Footer from "../Footer/Footer.js";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { headerRoutes, footerRoutes } from "../../utils/constants.js";
import mainApi from '../../utils/mainApi.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const handleSignOutBtnClick = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleRegisterFormSubmit = ({ email, name, password }) => {
    mainApi.register({ email, name, password })
      .then(() => navigate('/signin'))
      .catch(console.error);
  };

  const handleLoginFormSubmit = ({ email, password }) => {
    mainApi.login({ email, password })
      .then(() => {
        setIsLoggedIn(true);
        navigate('/');
      })
      .catch(console.error);
  };

  return (
    <>
      {headerRoutes.find(route => currentLocation.pathname === route) && <Header isLoggedIn={isLoggedIn}/>}
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/saved-movies' element={<SavedMovies />}/>
        <Route path='/profile' element={<Profile onSignOut={handleSignOutBtnClick} />}/>
        <Route path='/signup' element={<Register onSubmit={handleRegisterFormSubmit} />}/>
        <Route path='/signin' element={<Login onSubmit={handleLoginFormSubmit} />}/>
        <Route path='/*' element={<NotFound />}/>
      </Routes>
      {footerRoutes.find(route => currentLocation.pathname === route) && <Footer />}
    </>
  );
}

export default App;
