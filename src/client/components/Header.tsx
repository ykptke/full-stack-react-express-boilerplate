import * as React from 'react';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { AuthConsumer } from './AuthContext';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

const Header = ({ classes }: any) => (
  <AuthConsumer>
    {({ isAuth, logout }) => (
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            App
          </Typography>
          <Button color="inherit" component={({ innerRef, ...props }) => <Link {...props} to="/" />}>
            Home
          </Button>
          {isAuth ? (
            <>
              <Button color="inherit" component={({ innerRef, ...props }) => <Link {...props} to="/protected" />}>
                Protected
               </Button>
              <Button color="inherit" onClick={() => logout()}>Logout</Button>
            </>
          ) : (
              <>
                <Button color="inherit" component={({ innerRef, ...props }) => <Link {...props} to="/signup" />}>
                  Signup
               </Button>
                <Button color="inherit" component={({ innerRef, ...props }) => <Link {...props} to="/login" />}>
                  Login
               </Button>
              </>
            )}
        </Toolbar>
      </AppBar>
    )}
  </AuthConsumer>
);

export default withStyles(styles)(Header);
