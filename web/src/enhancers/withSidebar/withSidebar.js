import React from 'react';
import SideNav from 'Src/modules/SideNav';
import './withSidebar.scss';
import MiCMLogo from 'Src/modules/MiCMLogo';

const withSidebar = Component => {
  class withSidebarHOC extends React.Component {
    state = { open: false };

    render() {
      return (
        <div className={`with-sidebar ${this.state.open ? 'open' : ''}`}>
          <div className="header" />
          <div
            onClick={() => this.setState({ open: !this.state.open })}
            className={`nav-toggle ${this.state.open ? 'cross' : ''}`}
          >
            <div />
            <div />
            <div />
          </div>
          <div className="sidebar-container">
            <div className="logo">
              <MiCMLogo />
            </div>
            <SideNav />
          </div>
          <div className="component-container">
            <Component {...this.props} />
          </div>
        </div>
      );
    }
  }
  return withSidebarHOC;
};
export default withSidebar;
