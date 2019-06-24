import React from 'react';
import Logo from 'Src/public/micm.png';
import './micmLogo.scss';

const MiCMLogo = () => (
  <img
    className="micm-logo"
    src={Logo}
    alt="McGill initiative in Computational Medicine"
  />
);

export default MiCMLogo;
