// TODO -- register page

import Navbar from '../components/Navbar';
import '../styles/global.css';
import '../styles/home.css';
import Footer from '../components/Footer';
import { useState } from "react";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { username, email, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const newUser = {
            username,
            email,
            password
            // MongoDB will generate _id automatically on the server
        };

        try {
            const response = await axios.post('/api/user/register', newUser);
            console.log("User created:", response.data);
            alert("Registration successful! Please login.");
            window.location.href = "/login";
        } catch (error) {
            console.error("Registration error:", error);
            alert("Failed to register. Please try again.");
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
                        Email:
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
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
