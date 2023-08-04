import './App.css';
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import Footer from "../Footer/Footer.js";
import { Routes, Route, useLocation } from "react-router-dom";
import { headerRoutes, footerRoutes } from "../../utils/constants.js";

function App() {
  const currentLocation = useLocation();

  return (
    <>
      {headerRoutes.find(route => currentLocation.pathname === route) && <Header isLoggedIn={true}/>}
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/saved-movies' element={<SavedMovies />}/>
        <Route path='/profile'/>
        <Route path='/sign-up' element={<Register />}/>
        <Route path='/sign-in' element={<Login />}/>
        <Route path='/*' element={<NotFound />}/>
      </Routes>
      {footerRoutes.find(route => currentLocation.pathname === route) && <Footer />}
    </>
  );
}

export default App;
