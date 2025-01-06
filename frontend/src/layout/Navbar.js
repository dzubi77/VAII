import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../service/UserProvider";

export function Navbar() {
    const { user, logout } = useUser();
    const isLoggedIn = !!localStorage.getItem('role');

    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Logo</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/courses">Courses</Link>
                        </li>
                        {!isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Log in</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Sign up</Link>
                                </li>
                            </>
                        ) : (
                            user && (
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {user.name + " " + user.surname}
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="userDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/my_profile">Profile</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="/login" onClick={logout}>Log out</Link>
                                        </li>
                                    </ul>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
