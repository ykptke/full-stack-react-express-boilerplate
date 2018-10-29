import * as React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Signup from './components/Signup';
import Login from './components/Login';

const styles = (theme: any) => ({
  layout: {
    width: 'auto',
    marginTop: 10,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
});

const Protected = () => <h2>Protected</h2>;

const App = ({ classes }: any) => (
  <Router>
    <AuthProvider>
      <CssBaseline />
      <Header />
      <main className={classes.layout}>
        <Route path="/" exact component={Dashboard} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <ProtectedRoute path="/protected" component={Protected} />
      </main>
    </AuthProvider>
  </Router>
);

export default withStyles(styles)(App);
