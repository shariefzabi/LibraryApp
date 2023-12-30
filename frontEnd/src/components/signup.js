// SignupPage.js
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
const SignupPage = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const userData = useSelector((state) => state?.userReduce?.users);
  const dispatch = useDispatch()
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = useCallback((email) => {
    // Basic email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }, []);

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return passwordPattern.test(password);
  };

  const checkIfExistingUser = useCallback(() => {
    if (userData && Object.keys(userData).includes(email)) {
      setIsExistingUser(true);
    }

  }, [userData, email])

  const handleSignup = () => {
    const emailIsValid = validateEmail(email);
    const passwordIsValid = validatePassword(password);
    if (!emailIsValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Please enter a valid email address.',
      }));
      return
    }


    if (!passwordIsValid) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'Password must be at least 6 characters long, include 1 uppercase letter, and 1 special character (!@#$%^&*).'
      }));
      return;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      email: '', password: ''
    }));
    dispatch({ type: 'addUSer', payload: { email, password } })
    alert("user successfully Registered")
    navigate('/');

  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      {isExistingUser && (
        <div className="alert alert-warning" role="alert">
          You are an existing user.{' '}
          <Link to="/" className="alert-link">
            Click here to Login
          </Link>
        </div>
      )}
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">email</label>
          <input
            type="text"
            className="form-control col-md-4"
            id="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            onBlur={checkIfExistingUser}
          />
          {errors.email && (
            <div className="text-danger">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control col-md-4"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleSignup}
        >
          Sign Up
        </button>
        <p className="mt-3">
          Already have an account?{' '}
          <Link to="/" className="btn btn-link">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
