import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from 'Src/modules/Icon';
import './sideNavLink.scss';

const SideNavLink = ({ text, link }) => (
  <NavLink activeClassName="active" className="side-nav-link" to={link} exact>
    {text}
    <span>
      <Icon name="chevron-right" />
    </span>
  </NavLink>
);

SideNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default SideNavLink;
