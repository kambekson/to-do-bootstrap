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
            </aside>
        </>
    );
}

export default Sidebar;