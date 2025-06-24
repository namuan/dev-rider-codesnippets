import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from '../hooks/useAuth'; // Use the reactive hook
import './Navbar.css'; // We'll create this file

const Navbar: React.FC = () => {
    const { isAuthenticated, user, authService, isLoading } = useAuthState();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logout();
        navigate('/login'); // Redirect to login after logout
    };

    if (isLoading) {
        return <nav className="navbar">Loading navigation...</nav>;
    }

    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                        </li>
                        <li className="nav-item nav-user-info">
                            <span>Welcome, {user?.name}!</span>
                            <button onClick={handleLogout} className="nav-button">Logout</button>
                        </li>
                    </>
                ) : (
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">Login</Link>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;