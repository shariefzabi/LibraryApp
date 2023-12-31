import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        else if (newPassword !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        else {

            const newPasswordValid = validatePassword(newPassword)
            const confirmPasswordValid = validatePassword(confirmPassword)
            if (!newPasswordValid) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    newPassword: 'Password must be at least 6 characters long, include 1 uppercase letter, and 1 special character (!@#$%^&*).',
                }));
                return
            }
            if (!confirmPasswordValid) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: 'Password must be at least 6 characters long, include 1 uppercase letter, and 1 special character (!@#$%^&*).',
                }));
                return
            }
            if (newPasswordValid && confirmPassword) {
                const loginData = {
                    username,
                    password: newPassword
                };
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    newPassword: '', confirmPassword: ''
                }))
                const response = await axios.patch('http://localhost:3001/user/admin/changePassword', loginData)
                if (response.status === 200) {
                    navigate('/adminLogin')
                    alert('password changed Successfully')
                }

            }


            else {
                alert('username does not exists')
                return;
            }


        }

    };
    const validatePassword = (password) => {
        const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
        return passwordPattern.test(password);
    };

    return (
        <div className="container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">username:</label>
                    <input
                        className="form-control col-md-4"
                        type="username"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="new-password">New Password:</label>
                    <input
                        className="form-control col-md-4"
                        type="password"
                        id="new-password"
                        name="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    {errors.newPassword && (
                        <div className="text-danger">{errors.newPassword}</div>
                    )}
                </div>
                <div>
                    <label htmlFor="confirm-password">Confirm Password:</label>
                    <input
                        className="form-control col-md-4"
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {errors.confirmPassword && (
                        <div className="text-danger">{errors.password}</div>
                    )}
                </div>
                <button className="btn btn-primary mt-2" type="submit">Reset Password</button>
                <p >
                    New user?{' '}
                    <Link to="/signup" className="btn btn-link">
                        Sign Up
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default ResetPassword;
