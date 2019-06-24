import React from 'react';
import './sideNav.scss';
import PropTypes from 'prop-types';
import SideNavLink from 'Src/modules/SideNavLink';
import routes from 'Src/routes';

const SideNav = props => (
  <div className="side-nav">
    {routes.map((route, i) =>
      route.withSidebar && route.access.includes(props.type) ? (
        <SideNavLink
          key={`side_nav_link_${i}`}
          text={route.name}
          link={route.pathname}
        />
      ) : null
    )}
  </div>
);

SideNav.propTypes = {
  type: PropTypes.string.isRequired
};

export default SideNav;
