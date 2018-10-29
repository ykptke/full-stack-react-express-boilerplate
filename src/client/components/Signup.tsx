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
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.MouseEvent<HTMLElement>) => void;
}

const Signup: React.SFC<Props> = (props) => (
  <form>
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="name">Full name</InputLabel>
      <Input id="name" name="name" autoComplete="name" autoFocus onChange={props.onNameChange} />
    </FormControl>
    <FormControl margin="normal" required fullWidth>
      <InputLabel htmlFor="email">Email</InputLabel>
      <Input id="email" name="email" autoComplete="email" onChange={props.onEmailChange} />
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
      Signup
    </Button>
  </form>
);

class SignupContainer extends React.Component {
  state = {
    name: '',
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

  onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    this.setState({ name });
  }

  onSubmit = (e: React.MouseEvent<HTMLElement>, register: any) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    register(name, email, password);
  }

  render() {
    return (
      <AuthConsumer>
        {
          ({ isAuth, register }) =>
            isAuth
              ? <Redirect to="/" />
              : <Signup
                onEmailChange={this.onEmailChange}
                onNameChange={this.onNameChange}
                onPasswordChange={this.onPasswordChange}
                onSubmit={(e) => this.onSubmit(e, register)}
              />
        }
      </AuthConsumer>
    )
  }
};

export default SignupContainer;
