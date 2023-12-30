import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import './viewTodo.css'
import { v4 as uuidv4 } from 'uuid';

const TodoForm = () => {
    const [disableSave, setDisableSave] = useState(true)
    const currentUser = useSelector((state) => state.userReduce)?.currentUser;
    const storeTodos = useSelector((state) => state?.toDoReducer)?.[currentUser]
    const [todos, setTodos] = useState(storeTodos)
    const dispatch = useDispatch()
    const handleModalOpen = useCallback((e) => {
        const { id } = e.target
        const modal = document.getElementById(`Modal-${id}`);
        if (modal) {
            modal.style.display = 'block';
        }
        document.body.classList.add('custom-backdrop');
    }, []);
    const deleteHandler = useCallback((e) => {
        const index = e.target.id.split('-index-')[1]
        const newTodo = Object.assign([], todos)
        newTodo.splice(index, 1)
        setDisableSave(false)
        setTodos(newTodo)
    }, [todos])
    const refreshHandler = useCallback(function () {
        setDisableSave(true)
        setTodos(storeTodos)
    }, [storeTodos])
    const saveHandler = useCallback(() => {
        dispatch({ type: 'ModifyTodo', payload: { todos, currentUser } })
    }, [todos])

    return (
        < ViewToDo />
    )

    function ViewToDo() {

        if (todos?.length > 0) {

            return (
                <>
                    <h1 style={{ textAlign: 'center' }}>Todos</h1>
                    <div>
                        <div style={{ textAlign: 'end' }}>
                            <button onClick={() => {
                                saveHandler()
                                setDisableSave(true)
                                alert('todo Saved  succesfully')
                            }} disabled={disableSave} className='btn btn-success mr-2'>Save</button>
                            <button onClick={() => refreshHandler()} className='btn btn-primary mr-2'>refresh</button>
                        </div>
                        {
                            (todos.map((ele, index) => {
                                const id = `${uuidv4()}-index-${index}`
                                return (
                                    <div className="todo mb-2 mt-1" key={id}>
                                        <p className='taskName'>{ele.task}</p>
                                        <div style={{ textAlign: 'end' }}>
                                            <button id={index} className='btn btn-primary mr-2' onClick={handleModalOpen}>View/Edit</button>
                                            <button id={id} onClick={deleteHandler} className='btn btn-danger mr-2'>delete</button>
                                        </div>
                                        <Modal index={index} modalTodo={ele} setTodos={setTodos}></Modal>
                                    </div>
                                )
                            }))
                        }

                    </div>
                </>

            );
        }
        else {
            return <h2>No Todos ,<Link to='/todo'>add Todos</Link></h2>
        }
    }
    function Modal({ modalTodo, index, setTodos }) {
        const [task, setTask] = useState(modalTodo.task);
        const [description, setDescription] = useState(modalTodo.description);
        const [dueDate, setDueDate] = useState(modalTodo.dueDate);
        const [priority, setPriority] = useState(modalTodo.priority);
        const [assignee, setAssignee] = useState(modalTodo.assignee);
        const [status, setStatus] = useState(modalTodo.status);
        const [notes, setNotes] = useState(modalTodo.notes);
        const [category, setCategory] = useState(modalTodo.category);
        const [errors, setErrors] = useState({
            task: '',
            description: '',
            assignee: '',
            status: '',
            notes: '',
        });
        const handleModalClose = useCallback(() => {
            const modal = document.getElementById(`Modal-${index}`);
            if (modal) {
                modal.style.display = 'none';
            }
            document.body.classList.remove('custom-backdrop');
        }, []);
        const handleSubmit = (e) => {
            e.preventDefault();
            // Validation logic for each field
            if (Object.values(errors).every(ele => ele.length === 0)) {
                const todo = {
                    task,
                    description,
                    dueDate,
                    priority,
                    assignee,
                    status,
                    notes,
                    category
                }
                const cloneOFTodos = Object.assign([], todos)
                cloneOFTodos[index] = todo
                setTodos(cloneOFTodos)
                setDisableSave(false)
                handleModalClose()
            }
        };
        const errorHandler = useCallback((e) => {
            const maxLength = 50;
            const minLength = 8;
            if (minLength > e.target.value.trim().length || e.target.value.trim().length > maxLength)
                setErrors({ ...errors, [e.target.id]: `${e.target.id} length should be greater than 8 and less tha 50` })
            else {
                setErrors({ ...errors, [e.target.id]: '' })
            }
        }, [])
        return (
            <div className="modal" id={`Modal-${index}`} tabIndex="-1" role="dialog">
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
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="task" className="form-label">
                                        Task <span style={{ fontSize: '20px' }} className='text-danger'>*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="task"
                                        value={task}
                                        onChange={(e) => {
                                            errorHandler(e)
                                            setTask(e.target.value)
                                        }
                                        }
                                    />
                                    {errors.task && <div className="text-danger">{errors.task}</div>}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description <span style={{ fontSize: '20px' }} className='text-danger'>*</span>
                                    </label>
                                    <textarea
                                        required
                                        className="form-control"
                                        id="description"
                                        value={description}
                                        onChange={(e) => {
                                            errorHandler(e)
                                            setDescription(e.target.value)
                                        }}
                                    ></textarea>
                                    {errors.description && (
                                        <div className="text-danger">{errors.description}</div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">
                                        Category <span style={{ fontSize: '20px' }} className='text-danger'>*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="category"
                                        value={category}
                                        onChange={(e) => {
                                            errorHandler(e)
                                            setCategory(e.target.value)
                                        }}
                                    />
                                    {errors.category && (
                                        <div className="text-danger">{errors.category}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="dueDate" className="form-label">
                                        Due Date <span style={{ fontSize: '20px' }} className='text-danger'>*</span>
                                    </label>
                                    <input
                                        required
                                        type="date"
                                        className="form-control"
                                        id="dueDate"
                                        value={dueDate}
                                        onChange={(e) => {
                                            setDueDate(e.target.value)
                                        }
                                        }
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="priority" className="form-label">
                                        Priority <span style={{ fontSize: '20px' }} className='text-danger'>*</span>
                                    </label>
                                    <select
                                        required
                                        className="form-control"
                                        id="priority"
                                        value={priority}
                                        onChange={(e) => {

                                            setPriority(e.target.value)
                                        }}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="assignee" className="form-label">
                                        Assignee <span style={{ fontSize: '20px' }} className='text-danger'>*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="assignee"
                                        value={assignee}
                                        onChange={(e) => {
                                            errorHandler(e)
                                            setAssignee(e.target.value)
                                        }}
                                    />
                                    {errors.assignee && (
                                        <div className="text-danger">{errors.assignee}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="status" className="form-label">
                                        Status <span style={{ fontSize: '20px' }} className='text-danger'>*</span>
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        id="status"
                                        value={status}
                                        onChange={(e) => {
                                            errorHandler(e)
                                            setStatus(e.target.value)
                                        }}
                                    />
                                    {errors.status && (
                                        <div className="text-danger">{errors.status}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="notes" className="form-label">
                                        Notes
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="notes"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    ></textarea>
                                    {errors.notes && (
                                        <div className="text-danger">{errors.notes}</div>
                                    )}
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>
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
        )
    }
};



export default TodoForm;
