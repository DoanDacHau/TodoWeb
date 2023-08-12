import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import NotiHome from '../components/Noti.home.component'
import { useNavigate } from 'react-router-dom';
const Navbarr = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('USER');
        navigate('/api/v1/auth');
    };
    return (
        <div className='container-fluid'>

            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Navbar.Brand href="/api/v1/app">Reminders</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    </Nav>
                    <Nav>
                        <NotiHome />
                    </Nav>
                    <Nav>

                        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Navbarr
