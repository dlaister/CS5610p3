import { NavLink } from "react-router-dom";
import { useState } from "react";
import '../styles/navbar.css';

function Navbar() {
    // Replace this with context or props in real app
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [username, setUsername] = useState("Player1");

    return (
        <nav className="navbar">
            <ul>
                <li><NavLink to="/" className={({ isActive }) => (isActive ? "active-page" : "")}>Home</NavLink></li>
                <li><NavLink to="/rules" className={({ isActive }) => (isActive ? "active-page" : "")}>The Rules</NavLink></li>
                <li><NavLink to="/game" className={({ isActive }) => (isActive ? "active-page" : "")}>The Game</NavLink></li>
                <li><NavLink to="/scores" className={({ isActive }) => (isActive ? "active-page" : "")}>The Scores</NavLink></li>

                <li>
                    <NavLink to="/login" className={({ isActive }) => (isActive ? "active-page" : "")}>
                        {isSignedIn ? `Hello, ${username}` : "Sign In"}
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
