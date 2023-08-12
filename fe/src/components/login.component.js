import React, { Component } from 'react'
import { login } from '../services/auth';
import { Link, Navigate } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      shouldRedirectHome: false,
      routeRedirect: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    login(email, password)  // get user infor, contain role_id
      .then((res) => {
        Promise.all([
          localStorage.setItem('USER', JSON.stringify(res.data)),
          this.setState({
            routeRedirect:
              res.data.data.role_id === 1 ?
                '/admin/api/v1/app' :
                '/api/v1/app'
          }),
          this.setState({
            shouldRedirectHome: true
          })
        ])
      })
      .catch((err) => {
        alert("Wrong email or password!");
        this.setState({
          email: "",
          password: ""
        })
      })
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    if (this.state.shouldRedirectHome) return <Navigate to={this.state.routeRedirect} />

    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/api/v1/auth'}>
              To-do App
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/api/v1/auth'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/api/v1/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={this.handleSubmit}>
              <h3>Sign In</h3>

              <div className="mb-3">
                <label>Email address</label>
                <input
                  type="email"
                  name='email'
                  value={this.state.email}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter email"
                />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  name='password'
                  value={this.state.password}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter password"
                />
              </div>

              <div className="mb-3">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label className="custom-control-label" htmlFor="customCheck1">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <p className="forgot-password text-right">
                Forgot <a href="/resetpassword">password?</a>
              </p>
            </form>
          </div>
        </div>
      </>
    )
  }
}
