import React, { useState, useEffect, useCallback } from 'react';
export default function AssigningModal({ users, issueBook }) {

    console.log('', users)
    // Validation logic for each field

    const handleModalClose = useCallback(() => {
        const modal = document.getElementById(`Modal-assign`);
        if (modal) {
            modal.style.display = 'none';
        }
        document.body.classList.remove('custom-backdrop');
    }, []);


    const [selectedUser, setSelectedUser] = useState('');
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const handleSelectChange = (event) => {
        setSelectedUser(event.target.value);
    };



    const handleCreate = (e) => {
        e.preventDefault();
        issueBook(selectedUser, selectedDate)

        handleModalClose()

    };

    return (

        <div className="modal" id={`Modal-assign`} tabIndex="-1" role="dialog" >
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={handleModalClose}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className=" verticalScrollbar modal-body">
                        <div className="container mt-4">
                            <h2>Assign Book</h2>
                            <form>
                                <div className="container mt-4">

                                    <div className="mb-3">
                                        <label htmlFor="userSelect" className="form-label">
                                            select user
                                        </label>
                                        <select
                                            name='userSelect'
                                            className="form-control"
                                            id="userSelect"
                                            value={selectedUser}
                                            onChange={handleSelectChange}
                                        >
                                            <option value="">Select a user...</option>
                                            {users.map((user) => (
                                                <option key={user._id} value={user.username}>
                                                    {user.username}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="container mt-4">

                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">
                                            Return Date
                                        </label>
                                        <input
                                            name='date'
                                            type="date"
                                            className="form-control" // Bootstrap class for the input
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleCreate}>
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleModalClose}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div >
        </div >

    );
};