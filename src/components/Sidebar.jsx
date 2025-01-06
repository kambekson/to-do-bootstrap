import logo from "../assets/logo.svg";
import "./Sidebar.css";
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
    const sidebarItems = ["Clients", "Tasks manager", "Inbox", "Contacts"];
    const sidebarRoutes = ["/client", "/task", "/inbox", "/contacts"];

    return (
        <aside className="sidebar bg-light p-5">
            <Link to={"/"}>
                <img src={logo} alt="logo" className="mb-5" />
            </Link>

            <nav className="nav flex-column">
                {sidebarItems.map((item, index) => (
                    <NavLink
                        key={index}
                        className={({ isActive }) =>
                            isActive ? "nav-link fw-bold text-dark is-active" : "nav-link text-dark"
                        }
                        to={sidebarRoutes[index]}
                    >
                        {item}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar;