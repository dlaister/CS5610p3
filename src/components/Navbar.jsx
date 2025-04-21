import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../styles/navbar.css';

function Navbar() {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    // Check cookie on load and whenever the component re-renders
    useEffect(() => {
        const cookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("username="));
        if (cookie) {
            const user = cookie.split("=")[1];
            setUsername(user);
        } else {
            setUsername(null); // Clear username if cookie doesn't exist
        }
    }, []); // Empty array means this runs once on mount

    const handleLogout = async () => {
        try {
            await fetch("/api/user/logout", { method: "POST" });
            document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            setUsername(null);
            navigate("/"); // Redirect to homepage after logout
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active-page" : "")}>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/rules" className={({ isActive }) => (isActive ? "active-page" : "")}>
                        The Rules
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/scores" className={({ isActive }) => (isActive ? "active-page" : "")}>
                        The Scores
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/games" className={({ isActive }) => (isActive ? "active-page" : "")}>
                        All Games
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/newgame" className={({ isActive }) => (isActive ? "active-page" : "")}>
                        New Game
                    </NavLink>
                </li>

                {!username ? (
                    <>
                        <li>
                            <NavLink to="/login" className={({ isActive }) => (isActive ? "active-page" : "")}>
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" className={({ isActive }) => (isActive ? "active-page" : "")}>
                                Register
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="username-display">Hello, {username}</li>
                        <li>
                            <button className="logout-btn" onClick={handleLogout}>
                                Sign Out
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
