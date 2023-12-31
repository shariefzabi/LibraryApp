import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
function BookList() {
    const [books, setBooks] = useState([])


    const token = useSelector((state) => state?.JWTReducer?.token)
    if (token) {

        useEffect(() => {


            const config = {
                headers: {
                    Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
                }
            };
            axios.get(' http://localhost:3001/books/getBooks', config).then(({ data }) => {
                console.log(data)
                setBooks(data)
                console.log(books)
            })


        }, [])
        if (books.length) {

            return (
                <div>
                    <h2>List of Books</h2>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                        {books.map((book, index) => (
                            <div key={index} className="col mb-2">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h5 className="card-title">{book.name}</h5>
                                        <p className="card-text">Author: {book.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        else {
            return (<h1>No Books Assigned</h1>)
        }
    }
    else {
        return (<p className="col-3">
            <Link to="/">login as Normal User{' '}</Link>
        </p>)
    }
}
export default BookList