import * as React from 'react';

import { StyleRules, Theme, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
  classes?: any;
}

const styles = (theme: Theme): StyleRules => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const Loading: React.SFC<Props> = ({ classes }) => (
  <div className={classes.root}>
    <CircularProgress color="secondary" />
  </div>
);

export default withStyles(styles)(Loading);
