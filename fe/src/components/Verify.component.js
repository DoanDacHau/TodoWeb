import React, { Component } from 'react'
import { verifyCode } from '../services/auth';
import { Link, Navigate } from 'react-router-dom';

export default class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ''
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem('USER')); // get user data from localStorage

    verifyCode(user.email, this.state.code)
      .then((res) => {
        this.setState({ shouldRedirectLogin: true })
      })
      .catch((err) => {
        alert("Wrong code, enter again!");
        this.setState({
          code: '',
        })
      })
  };

  handleChange = (event) => {
    const code = event.target.value;
    this.setState({ code: code });
  };

  render() {
    if (this.state.shouldRedirectLogin) return <Navigate to="/api/v1/auth" />
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
            <h3>Verify</h3>

            <div className="mb-3">
              <label>Verify code</label>
              <input
                type="text"
                className="form-control"
                name='code'
                value={this.state.code}
                onChange={this.handleChange}
                placeholder="Enter code"
              />
            </div>


            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
      </>
    )
  }
}
