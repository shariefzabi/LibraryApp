import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const userData = useSelector((state) => state?.userReduce?.users);
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({ newPassword: '', confirmPassword: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !newPassword || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        else if (newPassword !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        else {
            if (userData && Object.keys(userData).includes(email)) {
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
                    dispatch({ type: 'changePassword', payload: { email, newPassword } })
                    navigate('/')
                    alert('password changed Successfully')

                }

            }
            else {
                alert('email does not exists')
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
                    <label htmlFor="email">Email:</label>
                    <input
                        className="form-control col-md-4"
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
