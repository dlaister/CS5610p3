import { NavLink } from "react-router-dom";
import '../styles/navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul>
                <li><NavLink to="/" className={({ isActive }) => (isActive ? "active-page" : "")}>Home</NavLink></li>
                <li><NavLink to="/rules" className={({ isActive }) => (isActive ? "active-page" : "")}>The Rules</NavLink></li>
                <li><NavLink to="/game" className={({ isActive }) => (isActive ? "active-page" : "")}>The Game</NavLink></li>
                <li><NavLink to="/scores" className={({ isActive }) => (isActive ? "active-page" : "")}>The Scores</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;
