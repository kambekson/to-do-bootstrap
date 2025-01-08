import logo from "../assets/logo.svg";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
    const sidebarItems = [
        { label: "Clients", route: "/client", icon: "bi-people" },
        { label: "Tasks manager", route: "/task", icon: "bi-check2-square" },
        { label: "Inbox", route: "/inbox", icon: "bi-chat-left-text" },
        { label: "Contacts", route: "/contacts", icon: "bi-journal-bookmark" }
    ];

    return (
        <>
            {/* Overlay backdrop for mobile */}
            {isOpen && (
                <div 
                    className="sidebar-overlay d-lg-none" 
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`sidebar-aside ${isOpen ? 'show' : ''}`}>
                <div className="d-flex align-items-center justify-content-between mb-5 w-100">
                    <Link to={"/"} className="d-flex align-items-center text-decoration-none">
                        <img src={logo} alt="logo" className="logo-img" />
                    </Link>
                    <button 
                        className="btn-close btn-close-white d-lg-none" 
                        aria-label="Close"
                        onClick={() => setIsOpen(false)}
                    />
                </div>

                <nav className="nav flex-column w-100 gap-2">
                    {sidebarItems.map((item, index) => (
                        <NavLink
                            key={index}
                            className={({ isActive }) =>
                                `nav-link sidebar-item ${isActive ? "active" : ""}`
                            }
                            to={item.route}
                            onClick={() => setIsOpen(false)}
                        >
                            <i className={`bi ${item.icon} me-3 fs-5`}></i>
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="mt-auto w-100 pt-4 border-top border-secondary border-opacity-25 d-none d-lg-block">
                    <div className="d-flex align-items-center gap-3">
                        <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px', fontWeight: 'bold' }}>
                            AI
                        </div>
                        <div>
                            <div className="fw-semibold text-main fs-7">Antigravity</div>
                            <div className="text-muted fs-8">Pro Assistant</div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Sidebar;