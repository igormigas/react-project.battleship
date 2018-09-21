import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../../components/UI/Header/';
import Footer from '../../components/UI/Footer/';
import FacebookProfile from '../../components/Facebook/FacebookProfile';
import LoginInfo from '../../components/Facebook/FacebookLoginInfo';

import classes from './Layout.scss';

class Layout extends React.Component {
	static propTypes = {
    children: PropTypes.node
  };

	render() {
		return (
			<div className={classes.App}>
        <Header />
        { this.props.userAuth && <FacebookProfile name={this.props.userName} image={this.props.userPicture.data.url} /> }
        {React.Children.only(this.props.children)}
        <Footer />
      </div>
		);
	}
}

const mapStateToProps = state => {
  return {
    userAuth: state.auth.userAuth,
    userName: state.auth.userFirstName + ' ' + state.auth.userLastName,
    userPicture: state.auth.userPicture,
  }
}

export default connect(mapStateToProps)(Layout);
