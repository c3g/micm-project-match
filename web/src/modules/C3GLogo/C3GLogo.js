import React from 'react';
import Logo from 'Src/public/c3g_Web.png';
import './c3gLogo.scss';

const C3GLogo = () => (
  <img
    className="c3g-logo"
    src={Logo}
    alt="Canadian Center for Computational Geonomics"
  />
);

export default C3GLogo;
