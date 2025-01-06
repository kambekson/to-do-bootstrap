import navIcon1 from "../assets/nav-icons1.svg"
import navIcon2 from "../assets/nav-icons2.svg"
import navUserLogo from "../assets/nav-user-logo.svg"
import {NavLink} from "react-router-dom";

function Header() {
    return (
        <header className="p-2 shadow-sm">
            <nav className="navbar px-4">
                <div className="container-fluid">
                    <form className="d-flex w-100 w-lg-75" role="search">
                        <input className="form-control me-2 flex-grow-1" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-dark" type="submit">Search</button>
                    </form>
                    <div className="d-flex">
                        <NavLink className="nav-link px-2" to="/task">
                            <img src={navIcon1} alt="logo"/>
                        </NavLink>
                        <NavLink className="nav-link px-2" to="/inbox">
                            <img src={navIcon2} alt="logo"/>
                        </NavLink>
                    </div>
                    <div className="d-flex align-items-center ">
                        <NavLink className="nav-link px-2" to="/client">
                            <img src={navUserLogo} alt="logo"/>
                        </NavLink>
                        <li className="nav-item dropdown-header">
                            <a className="nav-link dropdown-toggle fw-bolder" data-bs-toggle="dropdown" href="#" role="button"
                               aria-expanded="false">Azhar. I</a>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><a className="dropdown-item" href="#">Action</a></li>
                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                <li><a className="dropdown-item" href="#">Log Out</a></li>
                            </ul>
                        </li>
                    </div>
                </div>

            </nav>
        </header>
    )
}

export default Header;

