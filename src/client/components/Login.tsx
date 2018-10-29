import * as React from 'react';
import { AuthConsumer } from './AuthContext';
import { Redirect } from 'react-router-dom';

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

interface Props {
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
}

const Login: React.SFC<Props> = (props) => (
  <form>
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input id="email" name="email" autoComplete="email" autoFocus onChange={props.onEmailChange} />
    </FormControl>
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="password">Password</InputLabel>
      <Input
        name="password"
        type="password"
        id="password"
        autoComplete="current-password"
        onChange={props.onPasswordChange}
      />
    </FormControl>

    <Button
      type="submit"
      variant="contained"
      color="primary"
      fullWidth
      onClick={props.onSubmit}
    >
      Login
    </Button>
  </form>
);

class LoginContainer extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    this.setState({ email });
  }

  onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    this.setState({ password });
  }

  onSubmit = (e: React.MouseEvent<HTMLElement>, login: any) => {
    e.preventDefault();
    const { email, password } = this.state;
    login(email, password);
  }

  render() {
    return (
      <AuthConsumer>
        {
          ({ isAuth, login }) =>
            isAuth
              ? <Redirect to="/" />
              : <Login
                onEmailChange={this.onEmailChange}
                onPasswordChange={this.onPasswordChange}
                onSubmit={(e) => this.onSubmit(e, login)}
              />
        }
      </AuthConsumer>
    )
  }
};

export default LoginContainer;
