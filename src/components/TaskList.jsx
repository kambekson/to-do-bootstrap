function TaskList({ tasks, updateTaskStatus, statusTitle, s  }) {
    const handleChangeStatus = (taskId, newStatus) => {
        updateTaskStatus(taskId, { status: newStatus });
    };

    return (
        <ul className="list-group bg-light shadow-sm">
            <h2 className="fs-4 text-black p-3">{statusTitle}</h2>
            {tasks.length === 0 ? (
                <p className="text-center text-muted">No tasks in this category</p>
            ) : (
                tasks.map((task, index) => (
                    <div key={index} className="card my-2 mx-3 border-0 bg">
                        <ul className="list-unstyled ps-3 py-2">
                            <li className="d-flex align-items-center mb-2">
                                <p className="fw-bolder mb-0">{task.description}</p>
                                <p className="ms-2 mb-0">
                                    {task.priority === 'High' && <span className="badge bg-danger text-white">High</span>}
                                    {task.priority === 'Medium' && <span className="badge bg-warning text-white">Medium</span>}
                                    {task.priority === 'Low' && <span className="badge bg-success text-white">Low</span>}
                                </p>
                            </li>
                            <li className='mb-1'>Participant: {task.assignee}</li>
                            <li className='mb-1'>Date added: {task.dateCreated}</li>
                            <li className="d-flex align-items-center">
                                <select
                                    id={`status-${task.id}`}
                                    className="form-select me-3"
                                    value={task.status}
                                    onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                                >
                                    {/*{*/}
                                    {/*    statusOptions.map((status) => (*/}
                                    {/*        <option key={status} value={status}>{status}</option>*/}
                                    {/*    ))*/}
                                    {/*}*/}
                                    <option value="Closed">Closed</option>
                                    <option value="In progress">In progress</option>
                                    <option value="Frozen">Frozen</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                ))
            )}
        </ul>
    );
}

export default TaskList;
