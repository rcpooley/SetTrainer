import { Link } from 'react-router-dom';

export function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand ms-2" href="/">
                Set Trainer
            </a>
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/">
                        Explorer
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/test">
                        Test
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
