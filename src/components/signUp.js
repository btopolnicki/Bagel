import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import * as auth from '../auth';

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };

  }

  onSubmit = (event) => {

    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        history.push('/');
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();

  }

  render() {

    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';


    return (
      <div className="container">
        <h2>Sign up</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="username">Full Name:</label>
            <input className="form-control" id="username" name="username"
              value={username}
              onChange={event => this.setState(byPropKey('username', event.target.value))}
              type="text"
              placeholder="Full Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" name="email"
              value={email}
              onChange={event => this.setState(byPropKey('email', event.target.value))}
              type="text"
              placeholder="Email Address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input type="password" className="form-control" id="pwd" placeholder="Enter password" name="pswd"
              value={passwordOne}
              onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pwd2">Password:</label>
            <input className="form-control" id="pwd2" placeholder="Enter password" name="pswd2"
              value={passwordTwo}
              onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <button className="btn btn-primary" disabled={isInvalid} type="submit">
            Sign Up
        </button>

          {error && <p>{error.message}</p>}
        </form>
        <p>Already have an account?    {' '}<Link to='/LogIn'>Sign in</Link></p>
      </div>
    );
  }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    <Link to='/SignUp'>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

