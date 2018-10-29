import * as React from 'react';

interface AuthContextProps {
  isAuth: boolean;
  loading: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  register: (name: string, email: string, password: string) => void;
}

const AuthContext = React.createContext<AuthContextProps | null>(null);

class AuthProvider extends React.Component {
  state = {
    isAuth: false,
    loading: true,
  }

  componentDidMount() {
    const token = localStorage.getItem('token');

    fetch('/api/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.auth) {
          this.setState({ isAuth: true });
        } else {
          console.log(res.message);
        }
        this.setState({ loading: false });
      });
  }

  login = (email: string, password: string) => {
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.auth) {
          this.setState({ isAuth: true });
          localStorage.setItem('token', res.token);
        } else {
          alert(res.message);
        }
        this.setState({ loading: false });
      })
  }

  logout = () => {
    this.setState({ isAuth: false });
    localStorage.setItem('token', null);
  }

  register = (name: string, email: string, password: string) => {
    fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.auth) {
          this.setState({ isAuth: true });
          localStorage.setItem('token', res.token);
        } else {
          alert(res.message);
        }
        this.setState({ loading: false });
      })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          loading: this.state.loading,
          login: this.login,
          logout: this.logout,
          register: this.register
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer };
