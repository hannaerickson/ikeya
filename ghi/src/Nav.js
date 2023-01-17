import { NavLink } from 'react-router-dom';

function Nav() {


    return (
        <nav className="navbar navbar-expand-lg" style={{backgroundColor: '#E3D5CA'}}>
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">Ikeya</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/rooms">All Rooms</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Nav;
