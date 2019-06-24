import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './sideNavLink.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const SideNavLink = ({ text, link }) => (
  <NavLink activeClassName="active" className="side-nav-link" to={link} exact>
    {text}
    <span>
      <FontAwesomeIcon icon={faChevronRight} />
    </span>
  </NavLink>
);

SideNavLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};

export default SideNavLink;
