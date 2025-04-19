import {Link} from "react-router-dom";
import Navbar from '../components/Navbar.jsx';
import '../styles/global.css';
import '../styles/home.css';
import Footer from '../components/Footer.jsx';


function Home() {
    return (
        <div className="home">
            <Navbar/>

            <main className="main">
                <header>
                    <h1>Battleship Home</h1>
                </header>

                <div className="main-container">
                    <div className="sub-main">
                        <h3>Welcome to the world of <span className="red-text">Battleship</span>.</h3>
                        <h3>Command the Seas: Play Battleship Online!</h3>
                    </div>

                    <div className="paragraph">
                        <p>
                            Are you ready to outmaneuver your opponent, unleash devastating attacks, and claim victory
                            on the high seas? Battleship is the ultimate test of strategy, deception, and naval warfare!
                            Whether you're a seasoned captain or a fresh recruit, the thrill of battle awaits.
                        </p>
                        <p>
                            Hunt Down Enemy Ships – Use your wits and intuition to pinpoint enemy vessels and sink them
                            before they get you!
                        </p>
                        <p>
                            Strategic Fleet Placement – Position your ships wisely to outsmart your opponent and keep
                            your fleet afloat.
                        </p>
                        <p>
                            Engage in Tactical Warfare – Every move counts! Will you strike with precision or set traps
                            to lure your enemy into a devastating ambush?
                        </p>
                        <p>
                            Play Anytime, Anywhere – Challenge yourself by facing off against formidable AI opponent.
                        </p>
                        <p>
                            The ocean is vast, but victory is within reach. Do you have what it takes to become the
                            ultimate naval commander?
                        </p>
                    </div>

                    <p className="FirstBattle">
                        <Link to="/game" style={{textDecoration: "none", color: "blue", fontWeight: "bold"}}>
                            {"<<< Click Here To Start Your First Battle! >>>"}
                        </Link>
                    </p>

                    <img
                        src="https://i5.walmartimages.com/asr/c6671817-39be-451b-a73b-f3462c6db844.5e01de4f6c352c381f05e9c83cc7d556.jpeg"
                        alt="Battle Ship"/>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Home;
