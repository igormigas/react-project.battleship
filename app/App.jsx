import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import { AuthRoute, UnauthRoute } from './modules/CustomRoutes';

// Main CSS source
import './styles/global.scss';

// React Route Components
import Auth from './routes/Auth';
import Lobby from './routes/Lobby';
import Game from './routes/Game';
import Invite from './routes/Invite';

// React Components
import AuthHelper from './hoc/AuthHelper';
import Layout from './hoc/Layout';
import Spinner from './components/Spinner';

class App extends React.Component {
  render() {
    return (
      <AuthHelper>
        <Layout>
          { this.props.isAuth === null || this.props.isAuth === undefined ? <Spinner /> : (
            <Switch>
              <Route exact path="/auth/:mode" component={Auth} />
              <UnauthRoute path="/auth" component={Auth} redirectTo="/lobby" />
              <AuthRoute exact path="/invite/:id" component={Invite} redirectTo="/auth" />
              <AuthRoute exact path="/game/:id" component={Game} redirectTo="/auth" />
              <AuthRoute path="/game" component={Game} redirectTo="/auth" />
              <AuthRoute exact path="/lobby" component={Lobby} redirectTo="/auth" />
              <AuthRoute exact path="/" component={Lobby} redirectTo="/auth" />
              <Route render={() => <h1>Error 404 (default)</h1>} />
            </Switch>
          ) }
        </Layout>
      </AuthHelper>
    );
  }
}

App.propTypes = {
  isAuth: PropTypes.bool,
};

const mapStateToProps = state => ({
  isAuth: state.auth.isAuth,
});

export default withRouter(connect(mapStateToProps)(App));
