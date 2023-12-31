import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AssignModal from '../Modals/AssignModal';
import CreatingModal from '../Modals/createBookModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome icon
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import trash icon

function IssueBooks() {
    const [books, setBooks] = useState([])
    const [users, setUsers] = useState([])
    const [selectedBookId, setSelectedBookId] = useState('')

    const handleModalOpen = useCallback((id) => {

        const modal = document.getElementById(`Modal-${id}`);
        if (modal) {
            modal.style.display = 'block';
        }
        document.body.classList.add('custom-backdrop');
    }, []);

    const token = useSelector((state) => state?.JWTReducer?.token)
    if (token) {
        const config = {
            headers: {
                Authorization: `Bearer ${token}` // Include the token in the 'Authorization' header
            }
        }
        useEffect(() => {

            axios.post(' http://localhost:3001/books/getBooksForAdmin', { currentAvailabilityStatus: 'Available' }, config).then(({ data }) => {
                setBooks(data)
                console.log(data)
            })
            axios.get(' http://localhost:3001/user/getAllUsers', config).then(({ data }) => {
                setUsers(data)
                console.log(data)
            })




        }, [])
        const createBook = useCallback(async (BookData) => {
            const { data } = await axios.post(' http://localhost:3001/books', BookData, config)
            setBooks(data)
        })


        const deleteBook = useCallback(async (id) => {
            const { data } = await axios.delete(`http://localhost:3001/books/${id}`, config)
            setBooks(data)
        })
        const issueBook = useCallback(async (username, date) => {
            const { data } = await axios.patch(`http://localhost:3001/books/issueBooks`, { BookId: selectedBookId, username, date }, config)
            setBooks(data)
        })




        return (
            <div>
                <h2>List of Books</h2>
                <div className='mb-3' style={{ textAlign: 'end' }}>
                    <button onClick={() => handleModalOpen('create')} className='btn btn-primary mr-2'>Create Book</button>
                </div>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {books.map((book, index) => (
                        <div key={index} className="col mb-2">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className='mb-1' style={{ textAlign: 'end' }}>
                                        <button className='btn btn-danger' onClick={() => deleteBook(book._id)}> <FontAwesomeIcon icon={faTrash} size="1x" /></button>
                                    </div>
                                    <h5 className="card-title">{book.name}</h5>
                                    <p className="card-text">Author: {book.author}</p>
                                    <div >
                                        <button type='button' className='btn btn-primary' onClick={() => {
                                            setSelectedBookId(book._id)
                                            handleModalOpen('assign')
                                        }}>assignBook</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <CreatingModal createBook={createBook}></CreatingModal>
                <AssignModal issueBook={issueBook} users={users} />
            </div>
        );
    }
    else {
        return (<p className="col-3">
            <Link to="/adminLogin">login as Admin User{' '}</Link>
        </p>)
    }
}




export default IssueBooks