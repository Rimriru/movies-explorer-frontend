import Header from '../Header/Header.js';
import Promo from '../Promo/Promo.js';
import { useState } from 'react';

function Main () {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Promo>
        <Header isLoggedIn={isLoggedIn}/>
      </Promo>
    </>
  )
}

export default Main;
