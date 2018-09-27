import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from './modules/CustomRoutes';

// Main CSS source
import './styles/global.scss';

// React Components
import Auth from './hoc/Auth';
import Layout from './hoc/Layout';
import Spinner from './components/Spinner';

// React Route Components
import Login from './routes/Login';
import Lobby from './routes/Lobby';
import Game from './routes/Game';
import Invite from './routes/Invite';

class App extends React.Component {
  render() {
    return (
      <Auth>
        <Layout>
          { this.props.userAuth === null || this.props.userAuth === undefined ? <Spinner /> : (
            <Switch>
              <UnauthRoute path="/login" component={Login} redirectTo="/lobby" />
              <AuthRoute exact path="/invite/:id" component={Invite} redirectTo="/login" />
              <AuthRoute exact path="/game/:id" component={Game} redirectTo="/login" />
              <AuthRoute path="/game" component={Game} redirectTo="/login" />
              <AuthRoute exact path="/lobby" component={Lobby} redirectTo="/login" />
              <AuthRoute exact path="/" component={Lobby} redirectTo="/login" />
              <Route render={() => <h1>Error 404 (default)</h1>} />
            </Switch>
          ) }
        </Layout>
      </Auth>
    );
  }
}

App.propTypes = {
  userAuth: PropTypes.bool,
};

const mapStateToProps = state => ({
  userAuth: state.auth.userAuth,
});

export default withRouter(connect(mapStateToProps)(App));
