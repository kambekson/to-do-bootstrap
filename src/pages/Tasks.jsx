import TaskForm from '../components/TaskForm';
import { useState, useEffect } from "react";
import TaskList from "../components/TaskList.jsx";
import { useOutletContext } from "react-router-dom";
import TaskModal from "../components/TaskModal.jsx";

const initialTasks = [
    {
        id: 1,
        description: 'Design UI mockup and style guide',
        priority: 'High',
        status: 'In progress',
        author: 'Azhar. I',
        assignee: 'Jane Smith',
        dateCreated: "06.01.2025 10:30",
        subtasks: [
            { id: 101, text: 'Draw wireframes', completed: true },
            { id: 102, text: 'Select color palettes', completed: false },
            { id: 103, text: 'Define type scales', completed: false }
        ]
    },
    {
        id: 2,
        description: 'Configure Vite bundler and ESLint rules',
        priority: 'Low',
        status: 'Closed',
        author: 'Jane Smith',
        assignee: 'John Doe',
        dateCreated: "06.01.2025 14:20",
        subtasks: [
            { id: 201, text: 'Setup vite config', completed: true },
            { id: 202, text: 'Install dev dependencies', completed: true }
        ]
    },
    {
        id: 3,
        description: 'Implement responsive routing layouts',
        priority: 'Medium',
        status: 'Frozen',
        author: 'Azhar. I',
        assignee: 'Jane Smith',
        dateCreated: "06.01.2025 09:15",
        subtasks: [
            { id: 301, text: 'Verify sidebar collapses on mobile', completed: false }
        ]
    },
    {
        id: 4,
        description: 'Verify application performance benchmarks',
        priority: "Low",
        status: 'Closed',
        author: 'Jane Smith',
        assignee: 'John Doe',
        dateCreated: "06.01.2025 16:45",
        subtasks: []
    }
];

const users = [
    {
        id: 1,
        name: 'John Doe',
        role: 'Developer',
    },
    {
        id: 2,
        name: 'Jane Smith',
        role: 'Designer',
    },
    {
        id: 3,
        name: 'Mike Johnson',
        role: 'Tester',
    },
    {
        id: 4,
        name: 'Sarah Wilson',
        role: 'Project Manager',
    }
];

const priorities = ['Low', 'Medium', 'High'];
const statusOptions = ['In progress', 'Closed', 'Frozen'];

export default function Tasks() {
    const [tasks, setTasks] = useState(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                const parsed = JSON.parse(savedTasks);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            }
        } catch (e) {
            console.error("Error reading tasks from localStorage:", e);
        }
        return initialTasks;
    });
    const { searchQuery } = useOutletContext() || { searchQuery: '' };
    const [activeEditingTask, setActiveEditingTask] = useState(null);

    useEffect(() => {
        try {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (e) {
            console.error("Error saving tasks to localStorage:", e);
        }
    }, [tasks]);

    function addTask(newTask) {
        setTasks((prevTasks) => [newTask, ...prevTasks]);
    }

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, ...newStatus } : task
            )
        );
    };

    const deleteTask = (taskId) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    };

    const saveTaskDetails = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
        setActiveEditingTask(null);
    };

    // Filter tasks based on global searchQuery
    const filteredTasks = tasks.filter(task => {
        const query = searchQuery ? searchQuery.toLowerCase().trim() : '';
        if (!query) return true;
        return (
            task.description.toLowerCase().includes(query) ||
            task.assignee.toLowerCase().includes(query) ||
            task.priority.toLowerCase().includes(query) ||
            task.status.toLowerCase().includes(query)
        );
    });

    const inProgressTasks = filteredTasks.filter(task => task.status === statusOptions[0]);
    const closedTasks = filteredTasks.filter(task => task.status === statusOptions[1]);
    const frozenTasks = filteredTasks.filter(task => task.status === statusOptions[2]);

    return (
        <div className="container-fluid p-0">
            {/* Dashboard Title & Stats Overview */}
            <div className="d-flex flex-wrap align-items-center justify-content-between mb-4 gap-3">
                <div>
                    <h1 className="h3 mb-1 text-main font-weight-bold">Tasks Dashboard</h1>
                    <p className="text-muted mb-0">Manage, organize, and assign active project items</p>
                </div>
                <div className="d-flex gap-2">
                    <span className="badge bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-pill fs-7">
                        Total: {filteredTasks.length}
                    </span>
                    <span className="badge bg-warning bg-opacity-10 text-warning px-3 py-2 rounded-pill fs-7">
                        In Progress: {inProgressTasks.length}
                    </span>
                    <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fs-7">
                        Closed: {closedTasks.length}
                    </span>
                </div>
            </div>

            <div className="row g-4">
                <div className="col-12 col-xl-3">
                    <div className="sticky-xl-top" style={{ top: '24px', zIndex: 1 }}>
                        <h2 className="fs-5 text-main mb-3">Create New Task</h2>
                        <TaskForm addTask={addTask} users={users} priorities={priorities} />
                    </div>
                </div>
                
                <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <TaskList 
                        tasks={inProgressTasks}
                        updateTaskStatus={updateTaskStatus}
                        deleteTask={deleteTask}
                        onSelectTask={(task) => setActiveEditingTask(task)}
                        statusTitle="In Progress"
                        statusTheme="warning"
                        statusValue="In progress"
                    />
                </div>
                
                <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <TaskList 
                        tasks={closedTasks}
                        updateTaskStatus={updateTaskStatus}
                        deleteTask={deleteTask}
                        onSelectTask={(task) => setActiveEditingTask(task)}
                        statusTitle="Closed"
                        statusTheme="success"
                        statusValue="Closed"
                    />
                </div>
                
                <div className="col-12 col-md-6 col-lg-4 col-xl-3">
                    <TaskList 
                        tasks={frozenTasks}
                        updateTaskStatus={updateTaskStatus}
                        deleteTask={deleteTask}
                        onSelectTask={(task) => setActiveEditingTask(task)}
                        statusTitle="Frozen"
                        statusTheme="info"
                        statusValue="Frozen"
                    />
                </div>
            </div>

            {activeEditingTask && (
                <TaskModal 
                    task={activeEditingTask}
                    onClose={() => setActiveEditingTask(null)}
                    onSave={saveTaskDetails}
                    users={users}
                    priorities={priorities}
                />
            )}
        </div>
    );
}
