import './App.css';
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import NotFound from '../NotFound/NotFound';
import Footer from "../Footer/Footer.js";
import { Routes, Route } from "react-router-dom";
import { headerRoutes, footerRoutes } from "../../utils/constants.js";

function App() {
  return (
    <>
      {headerRoutes.find(route => window.location.pathname === route) && <Header isLoggedIn={true}/>}
      <Routes>
        <Route path='/' element={<Main />}/>
        <Route path='/movies' element={<Movies />}/>
        <Route path='/saved-movies' element={<SavedMovies />}/>
        <Route path='/*' element={<NotFound/>}/>
      </Routes>
      {footerRoutes.find(route => window.location.pathname === route) && <Footer/>}
    </>
  );
}

export default App;
