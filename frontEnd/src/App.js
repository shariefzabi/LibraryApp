import React from 'react';
import './style.css';
import store from './store/store.js';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/login.js';
import SignupPage from './components/signup.js';
import Todo from './todo/todo.js';
import ResetPassword from './components/ResetPassWord.js';
import AdminLoginPage from './components/adminLogin.js';
import AdminSignupPage from './components/adminSignup.js';
import BookList from './normalUSer/normalLibrary.js';
import NavBar from './normalUSer/normalLibrary.js';
export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          < Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />
            <Route path="/signup" element={<SignupPage></SignupPage>} />
            <Route path="/forgotPassword" element={<ResetPassword></ResetPassword>} />
            <Route path="/adminLogin" element={<AdminLoginPage></AdminLoginPage>} />
            <Route path="/adminSignup" element={<AdminSignupPage></AdminSignupPage>} />
            <Route path="/forgotPassword" element={<ResetPassword></ResetPassword>} />
            <Route path="/normalLibrary/*" element={<NavBar></NavBar>} />
            <Route path="/todo/*" element={<Todo></Todo>} />


          </Routes>
        </Router>
      </div>

    </Provider>
  );
}
