import { useState, useEffect } from 'react';
import './App.css';
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";

const initialTasks = [
    {
        id: 1,
        description: 'Design UI mockup and style guide',
        priority: 'High',
        status: 'In progress',
        author: 'Azhar. I',
        assignee: 'Jane Smith (Designer)',
        dateCreated: "06.01.2025 10:30",
        clientName: 'Acme Corporation',
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
        assignee: 'John Doe (Developer)',
        dateCreated: "06.01.2025 14:20",
        clientName: 'Globex Agency',
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
        assignee: 'Jane Smith (Designer)',
        dateCreated: "06.01.2025 09:15",
        clientName: 'Initech Software',
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
        assignee: 'John Doe (Developer)',
        dateCreated: "06.01.2025 16:45",
        clientName: 'Umbrella Corp',
        subtasks: []
    }
];

const mockClients = [
    { id: 1, name: 'Acme Corporation', industry: 'Technology', avatar: 'AC', email: 'contact@acme.com', phone: '+1 (555) 123-4567', address: '123 Tech Park, Silicon Valley' },
    { id: 2, name: 'Globex Agency', industry: 'Marketing', avatar: 'GA', email: 'info@globex.org', phone: '+1 (555) 987-6543', address: '456 Ad Avenue, New York' },
    { id: 3, name: 'Initech Software', industry: 'Finance', avatar: 'IS', email: 'support@initech.net', phone: '+1 (555) 456-7890', address: '789 Office Space, Austin' },
    { id: 4, name: 'Umbrella Corp', industry: 'Biotech', avatar: 'UC', email: 'lab@umbrella.corp', phone: '+1 (555) 321-0987', address: '101 Raccoon City, Midwest' }
];

function App() {
  // Tasks state
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const parsed = JSON.parse(savedTasks);
        if (Array.isArray(parsed)) {
          return parsed.map(task => ({
            ...task,
            clientName: task.clientName || 'Acme Corporation'
          }));
        }
      }
    } catch (e) {
      console.error("Error reading tasks from localStorage:", e);
    }
    return initialTasks;
  });

  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile sidebar visibility state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (e) {
      console.error("Error saving tasks to localStorage:", e);
    }
  }, [tasks]);

  return (
    <div className="d-flex min-vh-100 flex-column flex-lg-row">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div 
        className="flex-grow-1 d-flex flex-column" 
        style={{ 
          marginLeft: '0',
          transition: 'all var(--transition-normal)',
          backgroundColor: 'var(--bg-app)',
          minHeight: '100vh'
        }}
      >
        <Header 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-grow-1 p-3 p-md-4 p-xl-5" style={{ contentVisibility: 'auto' }}>
          <Outlet context={{ searchQuery, tasks, setTasks, clients: mockClients }} />
        </main>
      </div>
    </div>
  );
}

export default App;
