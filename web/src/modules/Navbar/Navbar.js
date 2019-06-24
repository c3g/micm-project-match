import React from 'react';
import MiCMLogo from 'Src/modules/MiCMLogo';
import PropTypes from 'prop-types';
import './navbar.scss';

const Navbar = ({ children }) => (
  <div className="navbar">
    <div className="logo">
      <MiCMLogo />
    </div>
    {children &&
      (children.map ? (
        children.map((child, i) => (
          <div key={`child_${i}`} className="nav-link">
            {child}
          </div>
        ))
      ) : (
        <div className="nav-link">{children}</div>
      ))}
  </div>
);

Navbar.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Navbar;
