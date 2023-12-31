// LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios'



const AdminLoginPage = () => {


    const dispatch = useDispatch()
    const [userName, setuserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {

        if (userName && password) {

            { }
            const loginData = {
                username: userName,
                password: password
            };
            try {

                const { data: { token } } = await axios.post('http://localhost:3001/user/admin/Login', loginData)
                dispatch({ type: 'setToken', payload: token })
                navigate('/userLibrary');

            }
            catch (err) {
                const message = err?.response?.data?.message
                if (message) {
                    alert(`${err.response.data.message}`);
                }
                else {
                    alert(`${err.message}`);
                }
            }
        }
        else {
            alert(`Invaid username and password`);
        }



    };

    return (
        <div className="container mt-5">
            <h2> Admin Login</h2>
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
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control col-md-4"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className='row'>
                    <button type="button" className="ml-3 btn btn-primary" onClick={handleLogin}>Login</button>
                    <p style={{ textAlign: 'end' }} className="col-3">
                        <Link to="/">login as Normal User{' '}</Link>
                    </p>
                </div>
                <div className='row'>
                    <p className="col-4">
                        New user?{' '}
                        <Link to="/adminSignup" className="btn btn-link">
                            Sign Up as Admin
                        </Link>
                    </p>
                    <p style={{ textAlign: 'end' }} className="col-2 mt-2">
                        <Link to="/forgotPassword"> forgot password?{' '}</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default AdminLoginPage;
