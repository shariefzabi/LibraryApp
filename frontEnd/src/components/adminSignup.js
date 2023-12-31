// SignupPage.js
import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const AdminSignupPage = () => {
    const [email, setemail] = useState('');
    const [name, setname] = useState('');
    const [userName, setUserName] = useState('')
    const [contact, setContact] = useState('')
    const navigate = useNavigate();
    const [password, setPassword] = useState('');

    const [isExistingUser, setIsExistingUser] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateEmail = useCallback((email) => {
        // Basic email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }, []);


    const handleContactNumberChange = (event) => {
        const input = event.target.value;
        const regex = /^[0-9]*$/; // Regular expression to allow only numbers

        if (regex.test(input)) {
            setContact(input);
        }
    };

    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        return passwordPattern.test(password);
    };


    const handleSignup = async () => {
        try {
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
            const signUpData = {
                "password": password,
                "username": userName,
                "name": name,
                "email": email,
                "contactNumber": contact

            }


            const { data: message } = await axios.post('http://localhost:3001/user/admin/signup', signUpData)
            console.log(message)
            if (message === 'Username already exists.') {
                setIsExistingUser(true)
            }
            else {
                navigate('/adminLogin');
                alert("user successfully Registered")
            }

        }
        catch (err) {
            console.log(err)
            alert(`${JSON.stringify(err.message)}`)
        }

    };

    return (
        <div className="container mt-5">
            <h2>Admin Sign Up</h2>
            {isExistingUser && (
                <div className="alert alert-warning" role="alert">
                    You are an existing Admin user.{' '}
                    <Link to="/adminLogin" className="alert-link">
                        Click here to Login
                    </Link>
                </div>
            )}
            <form>
                <div className="mb-3">
                    <label htmlFor="userName" className="form-label">userName</label>
                    <input
                        required
                        type="text"
                        className="form-control col-md-4"
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
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
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">name</label>
                        <input
                            required
                            type="text"
                            className="form-control col-md-4"
                            id="name"
                            value={name}
                            onChange={(e) => setname(e.target.value)}
                        />

                    </div>

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">email</label>
                    <input
                        required
                        type="text"
                        className="form-control col-md-4"
                        id="email"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}

                    />
                    {errors.email && (
                        <div className="text-danger">{errors.email}</div>
                    )}
                </div>


                <div className="mb-3">
                    <label htmlFor="Contact No" className="form-label">Contact No</label>
                    <input
                        required
                        type="tel"
                        className="form-control col-md-4"
                        id="ContactNo"
                        value={contact}
                        onChange={(e) => handleContactNumberChange(e)}
                    />

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
                    <Link to="/adminLogin" className="btn btn-link">
                        Login as Admin
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default AdminSignupPage;
