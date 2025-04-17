// TODO -- login page
import Navbar from '../components/Navbar';
import '../styles/global.css';
import '../styles/home.css';
import Footer from '../components/Footer';
import { useState } from "react";
import axios from "axios";

function Login() {
    const [loginUsernameState, setLoginUsernameState] = useState('');
    const [loginPasswordState, setLoginPasswordState] = useState('');

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

        const response = await axios.post('/api/user/login', request);
        console.log(response);
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
                        <input onChange={(event) => updatedUsername(event)} />
                    </div>
                    <div>
                        Password:
                        <input type="password" onChange={(event) => updatePassword(event)} />
                    </div>
                    <div>
                        <button onClick={() => submitLogin()}>Login</button>
                    </div>
                    <div>
                        Dont have an account? <a href="/register">Register here</a>
                    </div>

                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Login;
