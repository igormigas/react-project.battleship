import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import UserProfile from '../../components/UI/UserProfile';

import classes from './Layout.scss';

class Layout extends React.Component {
  onLogoutHandler = () => {
    this.props.history.push('/auth/logout');
  };

  render() {
    return (
      <div className={classes.App}>
        <Header />
        <UserProfile />
        {React.Children.only(this.props.children)}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
