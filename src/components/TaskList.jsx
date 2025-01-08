function TaskList({ tasks, updateTaskStatus, statusTitle, statusTheme }) {
    const handleChangeStatus = (taskId, newStatus) => {
        updateTaskStatus(taskId, { status: newStatus });
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case 'High':
                return <span className="badge bg-danger bg-opacity-10 text-danger border border-danger border-opacity-25 rounded-pill px-2">High</span>;
            case 'Medium':
                return <span className="badge bg-warning bg-opacity-10 text-warning border border-warning border-opacity-25 rounded-pill px-2">Medium</span>;
            default:
                return <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 rounded-pill px-2">Low</span>;
        }
    };

    return (
        <div 
            className="p-3 rounded-4" 
            style={{ 
                backgroundColor: 'rgba(var(--primary-rgb), 0.03)', 
                border: '1px solid var(--border-color)',
                minHeight: '400px'
            }}
        >
            <div className="d-flex align-items-center justify-content-between mb-3 pb-2 border-bottom border-secondary border-opacity-10">
                <h3 className="fs-6 fw-bold mb-0 text-main d-flex align-items-center gap-2">
                    <span className={`d-inline-block rounded-circle bg-${statusTheme} p-1.5`} style={{ width: '8px', height: '8px' }}></span>
                    {statusTitle}
                </h3>
                <span className="badge bg-secondary bg-opacity-10 text-main rounded-pill font-weight-bold fs-8">
                    {tasks.length}
                </span>
            </div>

            <div className="d-flex flex-column gap-3">
                {tasks.length === 0 ? (
                    <div className="text-center py-5 text-muted border border-dashed rounded-3 border-secondary border-opacity-25" style={{ borderStyle: 'dashed' }}>
                        <i className="bi bi-inbox fs-2 mb-2 d-block opacity-50"></i>
                        <span className="fs-8">No tasks here</span>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div 
                            key={task.id} 
                            className="premium-card p-3 d-flex flex-column gap-3"
                            style={{ 
                                backgroundColor: 'var(--bg-card)', 
                                border: '1px solid var(--border-color)' 
                            }}
                        >
                            <div className="d-flex align-items-start justify-content-between gap-2">
                                <p className="fw-semibold text-main mb-0 fs-7 leading-snug" style={{ minWidth: 0, wordBreak: 'break-word' }}>
                                    {task.description}
                                </p>
                                <div className="flex-shrink-0">
                                    {getPriorityBadge(task.priority)}
                                </div>
                            </div>

                            <div className="d-flex flex-column gap-2 text-muted fs-8">
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-person-circle text-primary opacity-75"></i>
                                    <span>{task.assignee}</span>
                                </div>
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-calendar3 text-secondary opacity-75"></i>
                                    <span>{task.dateCreated}</span>
                                </div>
                            </div>

                            <div className="pt-2 border-top border-secondary border-opacity-10">
                                <div className="d-flex align-items-center justify-content-between gap-2">
                                    <label htmlFor={`status-${task.id}`} className="fs-9 text-muted fw-semibold">Status</label>
                                    <select
                                        id={`status-${task.id}`}
                                        className="form-select form-select-sm py-1 ps-2 pe-4 fs-8 bg-light text-main"
                                        value={task.status}
                                        onChange={(e) => handleChangeStatus(task.id, e.target.value)}
                                        style={{ width: 'auto', border: '1px solid var(--border-color)' }}
                                    >
                                        <option value="In progress">In progress</option>
                                        <option value="Closed">Closed</option>
                                        <option value="Frozen">Frozen</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default TaskList;
