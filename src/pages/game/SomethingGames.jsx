// TODO -- all games

import {Link} from "react-router-dom";
import Navbar from '../../components/Navbar.jsx';
import '../../styles/global.css';
import '../../styles/game.css';
import '../../styles/home.css';
import Footer from '../../components/Footer.jsx';

function Games({games, currentUser}) {

    return (
        <div className="home">
            <Navbar />
            <main className="main">
                <header>
                    <h1>Something Games</h1>
                </header>

                <div className="main-container">



                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Games;
