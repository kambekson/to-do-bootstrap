import { useState } from "react";
import Button from "./Button.jsx";

export default function TaskForm({ addTask, users, priorities }) {
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [assignee, setAssignee] = useState('Unassigned');

    function handleSubmit(e) {
        e.preventDefault();
        if (!description || !priority || !assignee || assignee === 'Unassigned') {
            alert('Please assign a participant to the task.');
            return;
        }
        
        // Find user role for custom detail if needed
        const selectedUser = users.find(u => u.name === assignee);
        const roleStr = selectedUser ? ` (${selectedUser.role})` : '';

        const newTask = {
            id: Date.now(),
            description,
            priority,
            status: 'In progress',
            assignee: assignee + roleStr,
            dateCreated: new Date().toLocaleString('en-US', { 
                year: 'numeric', 
                month: '2-digit', 
                day: '2-digit', 
                hour: '2-digit', 
                minute: '2-digit' 
            }),
        };
        
        addTask(newTask);
        setDescription('');
        setPriority('Low');
        setAssignee('Unassigned');
    }

    return (
        <form 
            className="premium-card p-4 d-flex flex-column gap-3" 
            onSubmit={handleSubmit}
            style={{ border: '1px solid var(--border-color)' }}
        >
            <div>
                <label htmlFor="description" className="form-label d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-file-earmark-text text-primary"></i>
                    <span>Description</span>
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="description"
                    placeholder="Enter task detail..."
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>
            
            <div>
                <label htmlFor="priority" className="form-label d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-flag-fill text-danger"></i>
                    <span>Priority Level</span>
                </label>
                <select
                    className="form-select"
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    {priorities.map((p) => (
                        <option key={p} value={p}>
                            {p} Priority
                        </option>
                    ))}
                </select>
            </div>
            
            <div>
                <label htmlFor="assignee" className="form-label d-flex align-items-center gap-2 mb-2">
                    <i className="bi bi-person-fill text-success"></i>
                    <span>Assignee</span>
                </label>
                <select
                    className="form-select"
                    id="assignee"
                    value={assignee}
                    required
                    onChange={(e) => setAssignee(e.target.value)}
                >
                    <option value="Unassigned">Unassigned</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.name}>
                            {user.name} - {user.role}
                        </option>
                    ))}
                </select>
            </div>
            
            <div className="mt-2">
                <Button title="Add new task" type="submit" />
            </div>
        </form>
    );
}
