import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const TodoForm = () => {
    const currentUser = useSelector((state) => state.userReduce)?.currentUser;
    const dispatch = useDispatch()
    const [task, setTask] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState({
        task: '',
        description: '',
        assignee: '',
        status: '',
        notes: '',
    });

    const errorHandler = useCallback((e) => {
        const maxLength = 50;
        const minLength = 8;
        if (minLength > e.target.value.trim().length || e.target.value.trim().length > maxLength)
            setErrors({ ...errors, [e.target.id]: `${e.target.id} length should be greater than 8 and less tha 50` })
        else {
            setErrors({ ...errors, [e.target.id]: '' })
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
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
            dispatch({ type: 'addTodo', payload: { todo: { [currentUser]: todo }, currentUser } })
            alert('todo created succesfully')

            return;
        }
        // If all validations pass, submit the form

    };
    return (
        <div className="container mt-5">
            <h2>ToDo Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
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

                <div className="mb-1">
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
                <div className="mb-1">
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

                <div className="mb-1">
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

                <div className="mb-1">
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
                <div className="mb-1">
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

                <div className="mb-1">
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

                <div className="mb-1">
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
    );
};

export default TodoForm;
