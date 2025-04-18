// TODO -- register page

import Navbar from '../components/Navbar';
import '../styles/global.css';
import '../styles/home.css';
import Footer from '../components/Footer';
import { useState, useEffect } from "react";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        const isLoggedIn = document.cookie.includes("username=");
        if (isLoggedIn) {
            window.location.href = "/";
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { username, password, confirmPassword } = formData;

        if (!username || !password || !confirmPassword) {
            alert("All fields are required.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const newUser = { username, password };

        try {
            const response = await axios.post('/api/user/register', newUser);
            if (response.data.success) {
                document.cookie = `username=${username}; path=/`;
                alert("Registration successful!");
                window.location.href = "/";
            } else {
                alert(response.data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            alert("Registration failed. Username may already be taken.");
        }
    };

    return (
        <div className="home">
            <Navbar />
            <main className="main">
                <header>
                    <h1>Register</h1>
                </header>
                <div className="main-container">
                    <h3>Create Account:</h3>
                    <div>
                        Username:
                        <input
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>
                    <div>
                        Password:
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <div>
                        Confirm Password:
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                        />
                    </div>
                    <div>
                        <button onClick={handleSubmit}>Register</button>
                    </div>
                    <div>
                        Already have an account? <a href="/login">Login here</a>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Register;
