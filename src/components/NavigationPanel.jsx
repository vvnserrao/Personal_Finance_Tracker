import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaList, FaTasks, FaChartPie, FaSignOutAlt, FaBars } from 'react-icons/fa';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import '../styles/NavigationPanel.css'; 

const NavigationPanel = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login'); 
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="dashboard-top">
            <h1>Personal Finance Tracker</h1>
            <FaBars className="menu-icon" onClick={toggleMenu} />
            <nav className={`main-nav ${isMenuOpen ? 'open' : ''}`}>
                <ul className="dash-main">
                    <li>
                        <Link to="/add-transaction">
                            <FaPlus /> Add Transactions
                        </Link>
                    </li>
                    <li>
                        <Link to="/transaction-list">
                            <FaList /> Transaction List
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage-transactions">
                            <FaTasks /> Manage Transaction
                        </Link>
                    </li>
                    <li>
                        <Link to="/summary">
                            <FaChartPie /> Summary
                        </Link>
                    </li>
                    <li>
                        <button className="logout" onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default NavigationPanel;
