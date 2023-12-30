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

export default function App() {
  return (
    <Provider store={store}>
      <div>
        <Router>
          < Routes>
            <Route path="/" element={<LoginPage></LoginPage>} />
            <Route path="/signup" element={<SignupPage></SignupPage>} />
            <Route path="/forgotPassword" element={<ResetPassword></ResetPassword>} />
            <Route path="/todo/*" element={<Todo></Todo>} />


          </Routes>
        </Router>
      </div>

    </Provider>
  );
}
