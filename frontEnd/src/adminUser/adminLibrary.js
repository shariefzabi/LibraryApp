import React, { useState, useMemo } from 'react';

import './adminLibrary.css'
import { useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import IssueBooks from './issueBook';
import ReturnBook from './returnBook';



function AdminNavBar() {
    const activeStyle = ['not-active', 'not-active']
    const [selectViewUser, setselectViewUser] = useState(0)
    const classNames = useMemo(() => {
        const classArray = Object.assign([], activeStyle)
        classArray[selectViewUser] = 'active-link'
        return classArray
    }, [selectViewUser])
    let user = useSelector((state) => state?.JWTReducer?.username)

    if (user) {
        user = user.slice(0, 1)

        return (
            <>
                <ul className="row navbar">
                    <li className="col-2 nav-item">
                        <Link
                            onClick={() => setselectViewUser(0)}
                            className={`nav-link ${classNames[0]}`}

                            to={'/adminLibrary'}>Issue Book</Link>
                    </li>
                    <li className="col-2 nav-item">
                        <Link
                            onClick={() => setselectViewUser(1)}
                            className={`nav-link ${classNames[1]}`}
                            to={'/adminLibrary/ReturnBook'}>Return Book</Link>
                    </li>
                    <div className='col-6 profileWrapper m-2'>
                        <div className='profile'>{user}</div>
                        <Link className='pl-1 signOut' to='/'>Sign out</Link>
                    </div>
                </ul>
                <Routes>
                    <Route path="/" element={<IssueBooks />} />
                    <Route path="/ReturnBook" element={<ReturnBook />} />
                </Routes>
            </>




        )
    }
    return (<div>User Not available please <Link to='/adminLogin'>sign IN</Link></div>)
}

export default AdminNavBar;








