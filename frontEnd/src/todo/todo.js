import React, { useState, useMemo } from 'react';
import TodoForm from "./createTodo"
import ViewTodo from './viewTodo';
import './todo.css'
import { useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';



export default function Todo() {
    const [selectViewUser, setselectViewUser] = useState(false)
    const classNames = useMemo(() => {
        if (selectViewUser === false) {
            return ['active-link', 'not-active']
        }
        else {
            return ['not-active', 'active-link']
        }
    }, [selectViewUser])
    let user = useSelector((state) => state?.userReduce?.currentUser)
    if (user) {
        user = user.slice(0, 1)

        return (
            <>
                <ul className="row navbar">
                    <li className="col-2 nav-item">
                        <Link
                            onClick={() => setselectViewUser(false)}
                            className={`nav-link ${classNames[0]}`}

                            to={`/todo`}>Create ToDo</Link>
                    </li>
                    <li className="col-2 nav-item">
                        <Link
                            onClick={() => setselectViewUser(true)}
                            className={`nav-link ${classNames[1]}`}
                            to={`/todo/viewTodo`}>View ToDos</Link>
                    </li>
                    <div className='col-6 profileWrapper m-2'>
                        <div className='profile'>{user}</div>
                        <Link className='pl-1 signOut' to='/'>Sign out</Link>
                    </div>
                </ul>
                <Routes>
                    <Route path="/" element={<TodoForm></TodoForm>} />
                    <Route path="/viewTodo" element={<ViewTodo></ViewTodo>} />
                </Routes>
            </>




        )
    }
    return (<div>User Not available please <Link to='/'>sign IN</Link></div>)
}