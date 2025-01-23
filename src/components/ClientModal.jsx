
export default function ClientModal({ client, tasks = [], onClose }) {
    if (!client) return null;

    // Filter tasks for this client
    const clientTasks = tasks.filter(t => t.clientName === client.name);
    const totalCount = clientTasks.length;
    const inProgressCount = clientTasks.filter(t => t.status === 'In progress').length;
    const closedCount = clientTasks.filter(t => t.status === 'Closed').length;
    const frozenCount = clientTasks.filter(t => t.status === 'Frozen').length;
    
    const progress = totalCount > 0 ? Math.round((closedCount / totalCount) * 100) : 0;

    return (
        <div className="modal-backdrop-overlay" onClick={onClose}>
            <div className="modal-container p-4" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px', width: '90%' }}>
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom border-secondary border-opacity-10">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold fs-3" style={{ width: '60px', height: '60px' }}>
                            {client.avatar || (client.name ? client.name.substring(0, 2).toUpperCase() : 'CL')}
                        </div>
                        <div>
                            <h2 className="fs-5 fw-bold text-main mb-1">{client.name}</h2>
                            <span className="badge bg-secondary bg-opacity-10 text-main rounded-pill fs-8">{client.industry}</span>
                        </div>
                    </div>
                    <button 
                        type="button" 
                        className="btn-close text-main" 
                        aria-label="Close" 
                        onClick={onClose}
                        style={{ filter: 'none' }}
                    />
                </div>

                {/* Content Body */}
                <div className="d-flex flex-column gap-4" style={{ maxHeight: 'calc(80vh - 140px)', overflowY: 'auto', paddingRight: '4px' }}>
                    
                    {/* Contacts info grid */}
                    <div className="premium-card p-3" style={{ backgroundColor: 'rgba(0,0,0,0.01)', borderStyle: 'dashed' }}>
                        <h4 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Contact Information</h4>
                        <div className="row g-3">
                            <div className="col-12 col-sm-6 d-flex align-items-center gap-2">
                                <i className="bi bi-envelope text-primary fs-5"></i>
                                <div>
                                    <div className="text-muted fs-8">Email</div>
                                    <a href={`mailto:${client.email}`} className="text-main fw-semibold fs-7 text-decoration-none">{client.email}</a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 d-flex align-items-center gap-2">
                                <i className="bi bi-telephone text-success fs-5"></i>
                                <div>
                                    <div className="text-muted fs-8">Phone</div>
                                    <a href={`tel:${client.phone}`} className="text-main fw-semibold fs-7 text-decoration-none">{client.phone}</a>
                                </div>
                            </div>
                            <div className="col-12 d-flex align-items-center gap-2">
                                <i className="bi bi-geo-alt text-danger fs-5"></i>
                                <div>
                                    <div className="text-muted fs-8">Address</div>
                                    <div className="text-main fw-semibold fs-7">{client.address}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards Row */}
                    <div>
                        <h4 className="text-uppercase fw-bold text-muted mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Task Analytics</h4>
                        <div className="row g-2 mb-3">
                            <div className="col-6 col-sm-3">
                                <div className="text-center p-2 rounded border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
                                    <div className="fs-4 fw-bold text-main">{totalCount}</div>
                                    <div className="text-muted fs-8">Total Tasks</div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-3">
                                <div className="text-center p-2 rounded border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
                                    <div className="fs-4 fw-bold text-warning">{inProgressCount}</div>
                                    <div className="text-muted fs-8">In Progress</div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-3">
                                <div className="text-center p-2 rounded border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
                                    <div className="fs-4 fw-bold text-success">{closedCount}</div>
                                    <div className="text-muted fs-8">Closed</div>
                                </div>
                            </div>
                            <div className="col-6 col-sm-3">
                                <div className="text-center p-2 rounded border" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
                                    <div className="fs-4 fw-bold text-info">{frozenCount}</div>
                                    <div className="text-muted fs-8">Frozen</div>
                                </div>
                            </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mt-3">
                            <div className="d-flex justify-content-between fs-8 mb-1">
                                <span className="text-muted fw-semibold">Overall Completion Rate</span>
                                <span className="fw-bold text-main">{progress}%</span>
                            </div>
                            <div className="progress" style={{ height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px' }}>
                                <div 
                                    className="progress-bar bg-gradient" 
                                    role="progressbar" 
                                    style={{ 
                                        width: `${progress}%`, 
                                        borderRadius: '4px', 
                                        transition: 'width 0.4s ease',
                                        backgroundColor: 'var(--primary-color)' 
                                    }} 
                                    aria-valuenow={progress} 
                                    aria-valuemin="0" 
                                    aria-valuemax="100"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Associated Tasks List */}
                    <div>
                        <h4 className="text-uppercase fw-bold text-muted mb-2" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>Linked Tasks ({totalCount})</h4>
                        <div className="d-flex flex-column gap-2" style={{ maxHeight: '220px', overflowY: 'auto' }}>
                            {totalCount === 0 ? (
                                <div className="text-center text-muted py-4 border rounded border-dashed" style={{ borderColor: 'var(--border-color)' }}>
                                    <i className="bi bi-journal-x fs-2 opacity-50 mb-2 d-block"></i>
                                    <span>No tasks assigned to this client yet.</span>
                                </div>
                            ) : (
                                clientTasks.map(task => {
                                    // subtasks count
                                    const totalSub = task.subtasks?.length || 0;
                                    const completedSub = task.subtasks?.filter(s => s.completed).length || 0;
                                    
                                    // priority color badge colors
                                    let priorityBadgeClass = "bg-secondary text-white";
                                    if (task.priority === 'High') priorityBadgeClass = "bg-danger text-white";
                                    else if (task.priority === 'Medium') priorityBadgeClass = "bg-warning text-dark";
                                    else if (task.priority === 'Low') priorityBadgeClass = "bg-info text-dark";

                                    // status color badge
                                    let statusBadgeClass = "bg-warning bg-opacity-10 text-warning";
                                    if (task.status === 'Closed') statusBadgeClass = "bg-success bg-opacity-10 text-success";
                                    else if (task.status === 'Frozen') statusBadgeClass = "bg-info bg-opacity-10 text-info";

                                    return (
                                        <div 
                                            key={task.id} 
                                            className="p-3 rounded border d-flex flex-column gap-2"
                                            style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
                                        >
                                            <div className="d-flex justify-content-between align-items-start gap-2">
                                                <h5 className="fs-7 fw-semibold text-main mb-0">{task.description}</h5>
                                                <span className={`badge ${statusBadgeClass} rounded-pill fs-9 px-2`}>
                                                    {task.status}
                                                </span>
                                            </div>
                                            
                                            <div className="d-flex flex-wrap align-items-center gap-2 fs-8 text-muted">
                                                <span className={`badge ${priorityBadgeClass} fs-9 px-2`}>
                                                    {task.priority}
                                                </span>
                                                <span>•</span>
                                                <span className="d-flex align-items-center gap-1">
                                                    <i className="bi bi-person"></i> {task.assignee}
                                                </span>
                                                {totalSub > 0 && (
                                                    <>
                                                        <span>•</span>
                                                        <span className="d-flex align-items-center gap-1">
                                                            <i className="bi bi-check2-square"></i> {completedSub}/{totalSub} subtasks
                                                        </span>
                                                    </>
                                                )}
                                                <span className="ms-auto fs-9">{task.dateCreated}</span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="d-flex align-items-center justify-content-end gap-2 pt-3 mt-3 border-top border-secondary border-opacity-10">
                    <button 
                        type="button" 
                        className="btn btn-light px-4 py-2 border rounded-3 fs-7" 
                        onClick={onClose}
                        style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-muted)' }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
