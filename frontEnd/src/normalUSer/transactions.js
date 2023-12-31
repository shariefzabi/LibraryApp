import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import './transactions.css'
function TransactionList() {
    const [users, setUsers] = useState([])
    const token = useSelector((state) => state?.JWTReducer?.token)
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
            }
        };
        axios.get(' http://localhost:3001/user/getUsers', config).then(({ data }) => {
            console.log('usersDAta', data)
            setUsers(data)

        })
    }, [])

    if (users) {
        const { transactions } = users
        if (transactions) {
            return (
                <div >
                    <h1>TransactionList</h1>
                    {

                        (transactions.map((ele, index) => {
                            const id = `${uuidv4()}-index-${index}`
                            const date = ele.on.split('T')[0]
                            return (
                                <div className="todo mb-2 mt-1" key={id}>
                                    <p className='taskName'>{ele.name}</p>
                                    <p className='transaction-date'>{`IssuedOn: ${date}`}</p>
                                </div>
                            )
                        }))
                    }

                </div >

            )
        }
    }
    else {
        return (<h1>No Transactions As of now</h1>)
    }
}
export default TransactionList;