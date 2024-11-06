import React, { useRef, useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Login from "../auth/Login";
import { useAuth } from '../../ContextApi';


const Header = () => {
    const { token } = useAuth()
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('Authorization')
        toast.success('Logout Sucessfully', {
            autoClose: 2000,
            onClose: () => (window.location.href = '/')
        })
    }
    return (
        <>
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/" className="text-white">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token ? (
                                <>
                                  
                                        <LinkContainer to="/jobs/newJob">
                                            <Nav.Link className="text-white">Create Job</Nav.Link>
                                        </LinkContainer>
                                 
                                </>
                            ) : (
                                <>
                                   
                                        <LinkContainer to='/login'>
                                            <Button>
                                                Login
                                            </Button>
                                        </LinkContainer>
                                   
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header

{/* <Nav className="me-auto">
{token? (
    <LinkContainer to="/jobs/newJob">
        <Nav.Link className="text-white">Create Job</Nav.Link>
    </LinkContainer>
): (
<LinkContainer>
<Nav.Link className="text-white" as={Link} to="/login">Login </Nav.Link>
</LinkContainer>
)}
</Nav> */}