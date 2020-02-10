import React from 'react';
import './sideNav.scss';
import UserPropType from 'Src/propTypes/User';
import SideNavLink from 'Src/modules/SideNavLink';
import routes from 'Src/routes';
import LogoutButton from 'Src/modules/LogoutButton';

const SideNav = ({ user }) => (
  <div className="side-nav">
    {routes.map((route, i) =>
      typeof route.withSidebar === 'string' &&
      route.access.includes(user.type) ? (
        <SideNavLink
          key={`side_nav_link_${i}`}
          text={route.withSidebar}
          link={route.link || route.pathname}
        />
      ) : null
    )}
    <div className="flex-fill" />
    <LogoutButton />
    <div className="user-info">
      <div className="user-info__name">
        {user.firstName} {user.lastName}
      </div>
      <div className="user-info__type">{user.type}</div>
    </div>
  </div>
);

SideNav.propTypes = {
  user: UserPropType.isRequired
};

export default SideNav;
