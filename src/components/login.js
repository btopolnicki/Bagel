
import React, { Component } from 'react';
import * as auth from '../auth';
import { Link, Redirect } from 'react-router-dom';


const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    };
  }

  componentDidMount() {

  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push('/');
      })
      .catch(error => {
        console.log("error in login");
        console.log(error);
        this.setState(byPropKey('error', error));
      })

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <div className="container">
        <h2>Sign in</h2>

        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              name="email"
              className="form-control" id="email"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="email"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"
              value={password}
              onChange={event => this.setState(byPropKey('password', event.target.value))}
            />
          </div>
          <button className="btn btn-primary" disabled={isInvalid} type="submit">
            Sign In
        </button>

          {error && <p>{error.message}</p>}
        </form>
        <p>Don't have an account?    {' '}<Link to='/SignUp'>Sign up</Link> </p>
      </div>
    );
  }
}

export default Login;

