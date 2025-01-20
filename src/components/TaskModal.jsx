import { useState } from 'react';

export default function TaskModal({ task, onClose, onSave, users, priorities }) {
    const [description, setDescription] = useState(task.description);
    const [priority, setPriority] = useState(task.priority);
    // Parse the assignee name back to a clean name (e.g. "Jane Smith (Designer)" -> "Jane Smith")
    const cleanAssignee = task.assignee.split(' (')[0];
    const [assignee, setAssignee] = useState(cleanAssignee);
    const [subtasks, setSubtasks] = useState(task.subtasks || []);
    const [newSubtaskText, setNewSubtaskText] = useState('');

    const handleAddSubtask = (e) => {
        e.preventDefault();
        if (!newSubtaskText.trim()) return;
        const newSub = {
            id: Date.now(),
            text: newSubtaskText.trim(),
            completed: false
        };
        setSubtasks([...subtasks, newSub]);
        setNewSubtaskText('');
    };

    const handleToggleSubtask = (subId) => {
        setSubtasks(subtasks.map(sub => 
            sub.id === subId ? { ...sub, completed: !sub.completed } : sub
        ));
    };

    const handleDeleteSubtask = (subId) => {
        setSubtasks(subtasks.filter(sub => sub.id !== subId));
    };

    const handleSave = () => {
        const selectedUser = users.find(u => u.name === assignee);
        const roleStr = selectedUser ? ` (${selectedUser.role})` : '';
        
        const updatedTask = {
            ...task,
            description,
            priority,
            assignee: assignee + roleStr,
            subtasks
        };
        onSave(updatedTask);
    };

    return (
        <div 
            className="modal-backdrop-overlay" 
            onClick={onClose}
        >
            <div 
                className="modal-container p-4" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom border-secondary border-opacity-10">
                    <div>
                        <h2 className="fs-5 fw-bold text-main mb-1">Task Details</h2>
                        <span className="text-muted fs-8">Added on {task.dateCreated}</span>
                    </div>
                    <button 
                        type="button" 
                        className="btn-close text-main" 
                        aria-label="Close" 
                        onClick={onClose}
                        style={{ filter: 'none' }}
                    />
                </div>

                {/* Body */}
                <div className="d-flex flex-column gap-3 mb-4">
                    {/* Description */}
                    <div>
                        <label htmlFor="modal-description" className="form-label d-flex align-items-center gap-2 mb-2">
                            <i className="bi bi-file-earmark-text text-primary"></i>
                            <span>Description</span>
                        </label>
                        <input
                            type="text"
                            id="modal-description"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="row g-3">
                        {/* Priority */}
                        <div className="col-12 col-sm-6">
                            <label htmlFor="modal-priority" className="form-label d-flex align-items-center gap-2 mb-2">
                                <i className="bi bi-flag-fill text-danger"></i>
                                <span>Priority</span>
                            </label>
                            <select
                                id="modal-priority"
                                className="form-select"
                                value={priority}
                                onChange={(e) => setPriority(e.target.value)}
                            >
                                {priorities.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        {/* Assignee */}
                        <div className="col-12 col-sm-6">
                            <label htmlFor="modal-assignee" className="form-label d-flex align-items-center gap-2 mb-2">
                                <i className="bi bi-person-fill text-success"></i>
                                <span>Assignee</span>
                            </label>
                            <select
                                id="modal-assignee"
                                className="form-select"
                                value={assignee}
                                onChange={(e) => setAssignee(e.target.value)}
                            >
                                {users.map(user => (
                                    <option key={user.id} value={user.name}>{user.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Subtasks Section */}
                    <div className="pt-3 border-top border-secondary border-opacity-10">
                        <label className="form-label d-flex align-items-center justify-content-between mb-3">
                            <span className="d-flex align-items-center gap-2">
                                <i className="bi bi-check2-square text-primary"></i>
                                <span>Subtasks Checklist</span>
                            </span>
                            <span className="badge bg-secondary bg-opacity-10 text-main rounded-pill fs-8">
                                {subtasks.filter(s => s.completed).length}/{subtasks.length}
                            </span>
                        </label>

                        {/* Subtask input */}
                        <form onSubmit={handleAddSubtask} className="d-flex gap-2 mb-3">
                            <input 
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Add a new subtask..."
                                value={newSubtaskText}
                                onChange={(e) => setNewSubtaskText(e.target.value)}
                            />
                            <button 
                                type="submit" 
                                className="btn btn-sm btn-gradient px-3 border-0"
                                style={{ width: 'auto' }}
                            >
                                Add
                            </button>
                        </form>

                        {/* Subtask list */}
                        <div className="d-flex flex-column gap-2" style={{ maxHeight: '180px', overflowY: 'auto' }}>
                            {subtasks.length === 0 ? (
                                <p className="text-center text-muted fs-8 py-3 mb-0">No subtasks defined yet</p>
                            ) : (
                                subtasks.map(sub => (
                                    <div 
                                        key={sub.id} 
                                        className="d-flex align-items-center justify-content-between p-2 rounded-3 border"
                                        style={{ borderColor: 'var(--border-color)', backgroundColor: 'rgba(0,0,0,0.015)' }}
                                    >
                                        <div className="d-flex align-items-center gap-2">
                                            <input 
                                                type="checkbox"
                                                className="form-check-input mt-0"
                                                checked={sub.completed}
                                                onChange={() => handleToggleSubtask(sub.id)}
                                                style={{ width: '16px', height: '16px' }}
                                            />
                                            <span 
                                                className="fs-7 text-main"
                                                style={{ textDecoration: sub.completed ? 'line-through' : 'none', opacity: sub.completed ? 0.6 : 1 }}
                                            >
                                                {sub.text}
                                            </span>
                                        </div>
                                        <button 
                                            type="button" 
                                            className="btn btn-link p-1 text-danger border-0 opacity-50 opacity-100-hover"
                                            onClick={() => handleDeleteSubtask(sub.id)}
                                            style={{ outline: 'none', boxShadow: 'none' }}
                                        >
                                            <i className="bi bi-trash fs-8"></i>
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="d-flex align-items-center justify-content-end gap-2 pt-3 border-top border-secondary border-opacity-10">
                    <button 
                        type="button" 
                        className="btn btn-light px-4 py-2 border rounded-3 fs-7" 
                        onClick={onClose}
                        style={{ borderColor: 'var(--border-color)', backgroundColor: 'transparent', color: 'var(--text-muted)' }}
                    >
                        Cancel
                    </button>
                    <button 
                        type="button" 
                        className="btn btn-gradient px-4 py-2 border-0 rounded-3 fs-7" 
                        onClick={handleSave}
                        style={{ width: 'auto' }}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
