import Header from '../Header/Header.js';
import Promo from '../Promo/Promo.js';
import AboutProject from '../AboutProject/AboutProject.js';
import Techs from '../Techs/Techs.js';
import AboutMe from '../AboutMe/AboutMe.js';
import Portfolio from '../Portfolio/Portfolio.js';
import { useState } from 'react';
import "./Main.css";

export default function Main () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Portfolio/>
    </>
  )
}

