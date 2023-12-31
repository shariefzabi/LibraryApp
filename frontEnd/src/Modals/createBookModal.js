import React, { useState, useEffect, useCallback } from 'react';

export default function CreatingModal({ createBook }) {

    // Validation logic for each field
    const [disableButton, setDisableButton] = useState(true)

    const handleModalClose = useCallback(() => {
        const modal = document.getElementById(`Modal-create`);
        if (modal) {
            modal.style.display = 'none';
        }
        document.body.classList.remove('custom-backdrop');
    }, []);

    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        createBook({ name, author })

        handleModalClose()

    };

    return (
        <div className="modal" id={`Modal-create`} tabIndex="-1" role="dialog">
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
                            <h2>Create a New Book</h2>
                            <form onSubmit={handleCreate}>
                                <div className="mb-3">
                                    <label htmlFor="bookName" className="form-label">
                                        Book Name
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="bookName"
                                        placeholder="Enter book name"
                                        value={name}
                                        onChange={handleNameChange}
                                        minLength={10}
                                        maxLength={15}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="authorName" className="form-label">
                                        Author
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="authorName"
                                        placeholder="Enter author name"
                                        value={author}
                                        onChange={handleAuthorChange}
                                    />
                                </div>
                                <button className="btn btn-primary">
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
            </div>
        </div>

    );
};