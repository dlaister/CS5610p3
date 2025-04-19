import Navbar from '../components/Navbar.jsx';
import '../styles/global.css';
import '../styles/scores.css';
import Footer from '../components/Footer.jsx';

{/* TODO -- update to use the database of scores and users*/}
/*
* Score Page
URL structure - /high-scores

The score page will now work properly.  You should list out all the players, the name of wins and the number of losses.  The scores should be sorted by number of wins (if wins are equal among several pages, sort by fewest losses; if that is also tied, sort alphabetically by username).  Logged in and logged out users can see this page equally, but if a user is logged in, their username should be bold or in a unique color.

* */


function Scores() {
    return (
        <div className="scores">
            <Navbar/>

            <main className="main">
                <header>
                    <h1>Battleship Scores</h1>
                </header>

                <div className="main-container">
                    <div className="container">
                        {/* Left Sidebar */}
                        <div className="leftBar">
                            <h4>Player Name</h4>
                            <p>
                                EParker <br/>
                                JBennett <br/>
                                SCarter <br/>
                                LAnderson <br/>
                                OTurner <br/>
                                NMitchell <br/>
                                ACollins <br/>
                                MHughes <br/>
                                ISanders <br/>
                                EReed <br/>
                                MFoster <br/>
                                LMorgan <br/>
                                CHayes <br/>
                                HRoss <br/>
                                ABrooks <br/>
                                JHarper <br/>
                                HSullivan <br/>
                                BPrice <br/>
                                ECooper <br/>
                                AWard
                            </p>
                        </div>

                        {/* Main Content */}
                        <div className="mainContent">
                            <h4>Games Lost</h4>
                            <p>
                                29 <br/>
                                55 <br/>
                                63 <br/>
                                68 <br/>
                                73 <br/>
                                88 <br/>
                                93 <br/>
                                109 <br/>
                                124 <br/>
                                135 <br/>
                                137 <br/>
                                142 <br/>
                                145 <br/>
                                156 <br/>
                                158 <br/>
                                166 <br/>
                                166 <br/>
                                171 <br/>
                                193 <br/>
                                196
                            </p>
                        </div>

                        {/* Right Sidebar */}
                        <div className="rightBar">
                            <h4>Games Won</h4>
                            <p>
                                803 <br/>
                                880 <br/>
                                889 <br/>
                                893 <br/>
                                916 <br/>
                                924 <br/>
                                944 <br/>
                                951 <br/>
                                831 <br/>
                                837 <br/>
                                844 <br/>
                                845 <br/>
                                908 <br/>
                                913 <br/>
                                848 <br/>
                                983 <br/>
                                985 <br/>
                                986 <br/>
                                896 <br/>
                                899
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}

export default Scores;
