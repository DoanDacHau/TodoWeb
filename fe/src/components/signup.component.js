import React, { Component } from 'react';
import { register } from '../services/auth';
import { Link, Navigate } from 'react-router-dom';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      shouldRedirectVerify: false
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, password } = this.state;

    // Perform validation before submitting the form
    const errors = this.validateInputs();
    if (Object.keys(errors).length > 0) {
      console.log("PASS 1")
      this.setState({ errors });
    }

    console.log("PASS 3")
    register(firstName, lastName, email, password)
      .then((res) => {
        Promise.all([
          localStorage.setItem('USER', JSON.stringify(res.data)), // save user data to get email and verify
          this.setState({ shouldRedirectVerify: true }) // if register success, allow go to verify
        ])
      })
      .catch((err) => { // if failed to register
        alert("Email exist, enter other email!");
        this.setState({
          email: "", // reset email exist
        })
      })
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateInputs = () => {
    const { firstName, lastName, email, password, confirmPassword } = this.state;
    const errors = {};

    if (firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }

    if (lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }

    if (email.trim() === '') {
      errors.email = 'Email address is required';
    } else {
      // Basic email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Invalid email address';
      }
    }

    if (password === '') {
      errors.password = 'Password is required';
    }

    if (confirmPassword === '') {
      errors.confirmPassword = 'Confirm password is required';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  render() {
    const { errors } = this.state;

    if (this.state.shouldRedirectVerify) return <Navigate to="/api/v1/verify" /> // after register success, value become true and redirect

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
            <h3>Sign Up</h3>

            <div className="mb-3">
              <label>First name</label>
              <input
                id="first-name"
                className="form-control"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
            </div>

            <div className="mb-3">
              <label>Last name</label>
              <input
                id="last-name"
                className="form-control"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
            </div>

            <div className="mb-3">
              <label>Email address</label>
              <input
                id="email"
                className="form-control"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                id="password"
                className="form-control"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {errors.password && <div className="error">{errors.password}</div>}
            </div>

            <div className="mb-3">
              <label>Confirm Password</label>
              <input
                id="confirm-password"
                className="form-control"
                type="password"
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleChange}
              />
              {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
            </div>
            <p className="forgot-password text-right">
              Already registered <a href="/api/v1/auth">sign in?</a>
            </p>
          </form>
        </div>
      </div>
      </>
    );
  }
}
