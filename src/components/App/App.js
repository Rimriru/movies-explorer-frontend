import './App.css';
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from '../Movies/Movies';
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
      </Routes>
      {footerRoutes.find(route => window.location.pathname === route) && <Footer/>}
    </>
  );
}

export default App;
