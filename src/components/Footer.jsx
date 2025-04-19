import '../styles/footer.css';

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Derek's Best WebDev Site. All rights reserved.</p>
            <p><i>Derek Laister</i> -- CS5610|Winter 2025</p>
        </footer>
    );
}

export default Footer;
