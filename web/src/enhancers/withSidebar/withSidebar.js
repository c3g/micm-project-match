import React from 'react';
import SideNav from 'Src/modules/SideNav';
import './withSidebar.scss';
import MiCMLogo from 'Src/modules/MiCMLogo';

const withSidebar = Component => {
  const withSidebarHOC = props => (
    <div className="with-sidebar">
      <div className="sidebar-container">
        <div className="logo">
          <MiCMLogo />
        </div>
        <SideNav />
      </div>
      <div className="component-container">
        <Component {...props} />
      </div>
    </div>
  );
  return withSidebarHOC;
};

export default withSidebar;
