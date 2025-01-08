import { useState } from 'react';
import './App.css';
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import { Outlet } from "react-router-dom";

function App() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile sidebar visibility state
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <Outlet context={{ searchQuery }} />
        </main>
      </div>
    </div>
  );
}

export default App;
