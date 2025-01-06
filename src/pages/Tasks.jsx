import TaskForm from '../components/TaskForm';
import {useState} from "react";
import TaskList from "../components/TaskList.jsx";


const initialTasks = [
    {
        id: 1,
        description: 'Task 1',
        priority: 'Low',
        status: 'In progress',
        author: 'John Doe',
        assignee: 'Jane Smith',
        dateCreated: "2022-01-01",
    },
    {
        id: 2,
        description: 'Task 2',
        priority: 'High',
        status: 'Closed',
        author: 'Jane Smith',
        assignee: 'John Doe',
        dateCreated: "2022-01-01",
    },
    {
        id: 3,
        description: 'Task 3',
        priority: 'Medium',
        status: 'Frozen',
        author: 'John Doe',
        assignee: 'Jane Smith',
        dateCreated: "2022-01-01",
    },
    {
        id: 4,
        description: 'Task 4',
        priority: "Low",
        status: 'Closed',
        author: 'Jane Smith',
        assignee: 'John Doe',
        dateCreated: "2022-01-01",
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
]

const priorities = ['Low', 'Medium', 'High'];

const statusOptions = ['In progress', 'Closed', 'Frozen'];

export default function Tasks() {
    const [tasks, setTasks] = useState(initialTasks);

    function addTask(newTask) {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    }

    const updateTaskStatus = (taskId, newStatus) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId ? { ...task, ...newStatus } : task
            )
        );
    };

    const inProgressTasks = tasks.filter(task => task.status === statusOptions[0]);
    const closedTasks = tasks.filter(task => task.status === statusOptions[1]);
    const frozenTasks = tasks.filter(task => task.status === statusOptions[2]);

return (
    <>
        <div className="row">
            <div className="col-3">
                <TaskForm addTask={addTask} users={users} priorities={priorities}/>
            </div>
            <div className="col-3">
                <TaskList tasks={inProgressTasks}
                          updateTaskStatus={updateTaskStatus}
                          statusTitle="In Progress"
                />
            </div>
            <div className="col-3">
                <TaskList tasks={closedTasks}
                          updateTaskStatus={updateTaskStatus}
                          statusTitle="Closed"
                />
            </div>
            <div className="col-3">
                <TaskList tasks={frozenTasks}
                          updateTaskStatus={updateTaskStatus}
                          statusTitle="Frozen"
                />
            </div>
        </div>
    </>
)
}

