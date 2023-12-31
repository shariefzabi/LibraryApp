import React, { useState, useMemo } from 'react';
import BookList from './books';
import TransactionList from './transactions';
import './normalLibrary'
import { useSelector } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';



function NavBar() {
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

                            to={'/normalLibrary'}>Books</Link>
                    </li>
                    <li className="col-2 nav-item">
                        <Link
                            onClick={() => setselectViewUser(1)}
                            className={`nav-link ${classNames[1]}`}
                            to={'/normalLibrary/Transactions'}>Transactions</Link>
                    </li>
                    <div className='col-6 profileWrapper m-2'>
                        <div className='profile'>{user}</div>
                        <Link className='pl-1 signOut' to='/'>Sign out</Link>
                    </div>
                </ul>
                <Routes>
                    <Route path="/" element={<BookList></BookList>} />
                    <Route path="/Transactions" element={<TransactionList></TransactionList>} />
                </Routes>
            </>




        )
    }
    return (<div>User Not available please <Link to='/'>sign IN</Link></div>)
}

export default NavBar;








