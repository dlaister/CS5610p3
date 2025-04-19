// TODO -- login page

import Navbar from '../components/Navbar.jsx';
import '../styles/global.css';
import '../styles/home.css';
import Footer from '../components/Footer.jsx';
import {useState, useEffect} from "react";
import axios from "axios";

function Login() {
    const [loginUsernameState, setLoginUsernameState] = useState('');
    const [loginPasswordState, setLoginPasswordState] = useState('');

    // block login if currently logged in
    useEffect(() => {
        const isLoggedIn = document.cookie.includes("username=");
        if (isLoggedIn) {
            window.location.href = "/";
        }
    }, []);

    function updatedUsername(event) {
        setLoginUsernameState(event.target.value);
    }

    function updatePassword(event) {
        setLoginPasswordState(event.target.value);
    }

    async function submitLogin() {
        const request = {
            username: loginUsernameState,
            password: loginPasswordState
        };

        try {
            const response = await axios.post('/api/user/login', request);
            if (response.data.success) {
                document.cookie = `username=${loginUsernameState}; path=/`;
                window.location.href = "/";
            } else {
                alert("Invalid username or password.");
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed.");
        }
    }

    return (
        <div className="home">
            <Navbar/>
            <main className="main">
                <header>
                    <h1>Login</h1>
                </header>
                <div className="main-container">
                    <h3>Login Here:</h3>
                    <div>
                        Username:
                        <input onChange={updatedUsername}/>
                    </div>
                    <div>
                        Password:
                        <input type="password" onChange={updatePassword}/>
                    </div>
                    <div>
                        <button onClick={submitLogin}>Login</button>
                    </div>
                    <div>
                        Don’t have an account? <a href="/src/pages/Register">Register here</a>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Login;
