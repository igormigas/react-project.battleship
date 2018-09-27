import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from '../../components/UI/Header';
import Footer from '../../components/UI/Footer';
import FacebookProfile from '../../components/Facebook/FacebookProfile';

import classes from './Layout.scss';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node,
  };

  render() {
    return (
      <div className={classes.App}>
        <Header />
        { this.props.userAuth && (
          <FacebookProfile
            name={this.props.userName}
            image={this.props.userPicture.url}
          />
        ) }
        {React.Children.only(this.props.children)}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  userAuth: PropTypes.bool,
  userName: PropTypes.string,
  userPicture: PropTypes.object,
};

const mapStateToProps = state => ({
  userAuth: state.auth.userAuth,
  userName: `${state.auth.userFirstName} ${state.auth.userLastName}`,
  userPicture: state.auth.userPicture,
});

export default connect(mapStateToProps)(Layout);
