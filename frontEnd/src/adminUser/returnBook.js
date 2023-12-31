import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function ReturnBook() {
    const [books, setBooks] = useState([])



    const token = useSelector((state) => state?.JWTReducer?.token)

    const config = {
        headers: {
            Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
        }
    }
    useEffect(() => {

        axios.post(' http://localhost:3001/books/getBooksForAdmin', { currentAvailabilityStatus: 'NotAvailable' }, config).then(({ data }) => {
            setBooks(data)
            console.log(data)
        })

    }, [])

    const returnBook = useCallback(async (username, id) => {
        const { data } = await axios.patch(`http://localhost:3001/books/ReturnBooks`, { BookId: id, username }, config)
        setBooks(data)
    })

    if (books.length)
        return (
            <div>
                <h2>List of  Assined Books</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {books.map((book, index) => (
                        <div key={index} className="col mb-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{book.name}</h5>
                                    <p className="card-text">Author: {book.author}</p>
                                    <p className="card-text">Return Date: {book.returnDate}</p>
                                    <div >
                                        <button type='button' className='btn btn-primary' onClick={() => {
                                            returnBook(book.AssignedTo, book._id)
                                        }}>Return Book</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        );
    else
        return (<p className="col-3">No  Assigned Books as of now
        </p>)
}

