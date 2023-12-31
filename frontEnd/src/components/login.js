// LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios'


const LoginPage = () => {


  const dispatch = useDispatch()
  const [userName, setuserName] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {

    if (userName) {

      const loginData = {
        username: userName
      };
      try {

        const { data } = await axios.post('http://localhost:3001/user/normal/Login', loginData)
        dispatch({ type: 'setToken', payload: data })

        navigate('/normalLibrary');

      }
      catch (err) {
        alert(`${err.message}`);
      }
    }
    else {
      alert(`Invaid username and password`);
    }



  };

  return (
    <div className="container mt-5">
      <h2> Normal Login</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">userName</label>
          <input
            type="text"
            className="form-control col-md-4"
            id="userName"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
          />
        </div>

        <div className='row'>
          <button type="button" className="ml-3 btn btn-primary" onClick={handleLogin}>Login</button>
          <p style={{ textAlign: 'end' }} className="col-3">
            <Link to="/adminLogin">login as Admin{' '}</Link>
          </p>
        </div>
        <div className='row'>
          <p className="col-3">
            New user?{' '}
            <Link to="/signup" className="btn btn-link">
              Sign Up as user
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
