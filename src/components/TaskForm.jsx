import { useState } from "react";
import Button from "./Button.jsx";

export default function TaskForm({ addTask, users, priorities }) {
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [assignee, setAssignee] = useState('unassigned');

    function handleSubmit(e) {
        e.preventDefault();
        if (!description || !priority || !assignee) {
            return;
        }
        const newTask = {
            id: Date.now(),
            description,
            priority,
            status: 'In progress',
            assignee,
            dateCreated: new Date().toLocaleString(),
        };
        addTask(newTask);
        setDescription('');
        setPriority('Low');
        setAssignee('');
    }

    return (
        <form className="card bg-light border-0 shadow-sm" onSubmit={handleSubmit}>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input
                        type="text"
                        className="form-control bg-light"
                        id="description"
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select
                        className="form-select bg-light"
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        {priorities.map((priority) => (
                            <option key={priority} value={priority}>
                                {priority}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="assignee" className="form-label">Assignee</label>
                    <select
                        className="form-select bg-light"
                        id="assignee"
                        value={assignee}
                        required
                        onChange={(e) => setAssignee(e.target.value)}
                    >
                        <option>Unassigned</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.name}>
                                {user.name} ({user.role})
                            </option>
                        ))}
                    </select>
                </div>
                <Button title={"Add new task"}/>
            </div>
        </form>
    );
}
