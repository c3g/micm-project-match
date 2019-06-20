import React from 'react';
import C3GLogo from 'Src/modules/C3GLogo';
import PropTypes from 'prop-types';
import './navbar.scss';

const Navbar = ({ children }) => (
  <div className="navbar">
    <div className="logo">
      <C3GLogo />
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
