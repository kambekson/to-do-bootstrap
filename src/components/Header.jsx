import navIcon1 from "../assets/nav-icons1.svg";
import navIcon2 from "../assets/nav-icons2.svg";
import navUserLogo from "../assets/nav-user-logo.svg";
import { NavLink } from "react-router-dom";

function Header({ searchQuery, setSearchQuery, toggleSidebar }) {
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <header 
            className="px-3 py-2 px-md-4 py-md-3 border-bottom shadow-sm" 
            style={{ 
                backgroundColor: 'var(--bg-header)', 
                borderColor: 'var(--border-color)',
                transition: 'background-color var(--transition-normal), border-color var(--transition-normal)'
            }}
        >
            <nav className="navbar p-0">
                <div className="container-fluid p-0 d-flex align-items-center justify-content-between gap-3">
                    
                    {/* Left: Mobile hamburger menu toggle */}
                    <button 
                        className="btn btn-link p-1 text-main d-lg-none" 
                        type="button" 
                        onClick={toggleSidebar}
                        aria-label="Toggle Navigation"
                    >
                        <i className="bi bi-list fs-2"></i>
                    </button>

                    {/* Center-left: Modern search bar */}
                    <div className="d-flex flex-grow-1 max-w-md position-relative">
                        <span className="position-absolute top-50 start-0 translate-middle-y ps-3 text-muted">
                            <i className="bi bi-search"></i>
                        </span>
                        <input 
                            className="form-control ps-5 py-2 border bg-light text-main" 
                            type="search" 
                            placeholder="Type to search tasks..." 
                            aria-label="Search"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{ 
                                borderRadius: '30px', 
                                border: '1px solid var(--border-color)',
                                maxWidth: '380px'
                            }}
                        />
                    </div>

                    {/* Right side: Icons & user profile */}
                    <div className="d-flex align-items-center gap-2 gap-md-3">

                        {/* Navigation Shortcut Icons */}
                        <div className="d-none d-md-flex align-items-center gap-1">
                            <NavLink className="btn btn-link p-2 text-muted" to="/task" title="Tasks">
                                <img src={navIcon1} alt="tasks-logo" style={{ width: '20px', height: '20px' }} />
                            </NavLink>
                            <NavLink className="btn btn-link p-2 text-muted" to="/inbox" title="Inbox">
                                <img src={navIcon2} alt="inbox-logo" style={{ width: '20px', height: '20px' }} />
                            </NavLink>
                        </div>

                        <div className="vr opacity-25 text-main"></div>

                        {/* User Logo & Dropdown */}
                        <div className="dropdown d-flex align-items-center">
                            <NavLink className="p-0 me-2" to="/client">
                                <img 
                                    src={navUserLogo} 
                                    alt="user-avatar" 
                                    className="rounded-circle border border-primary border-2 p-0.5" 
                                    style={{ width: '38px', height: '38px', objectFit: 'cover' }}
                                />
                            </NavLink>
                            <div className="d-none d-sm-inline-block text-start">
                                <a 
                                    className="nav-link dropdown-toggle fw-semibold text-main p-0 align-middle fs-7" 
                                    data-bs-toggle="dropdown" 
                                    href="#" 
                                    role="button"
                                    aria-expanded="false"
                                >
                                    Azhar. I
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2 rounded-3">
                                    <li><a className="dropdown-item py-2 fs-7" href="#"><i className="bi bi-person me-2"></i>Profile</a></li>
                                    <li><a className="dropdown-item py-2 fs-7" href="#"><i className="bi bi-gear me-2"></i>Settings</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item py-2 text-danger fs-7" href="#"><i className="bi bi-box-arrow-right me-2"></i>Log Out</a></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Header;

