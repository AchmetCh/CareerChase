import React from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserJobs from "../jobs/UserJobs";
import { useAuth } from '../../ContextApi';


const Header = () => {
    const { userId, token, logout } = useAuth()
    const navigate = useNavigate()
    const { id } = useParams()

    const handleLogout = async () => {
        await logout();
        toast.success('Logout Successfully', {
            autoClose: 2000,
            onClose: () => navigate('/')
        });
    };

    return (
        <>
            <Navbar bg="dark"  collapseOnSelect>
                <Container>
                    <Navbar.Brand as={Link} to="/" className="text-white"><Button variant="info">Home</Button></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {token ? (
                                <>
                                    <LinkContainer to="/jobs/newJob">
                                        <Nav.Link className="text-white"><Button>Create Job</Button></Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to={`/jobs/getUserJobs/${userId}`}>
                                        <Nav.Link className="text-white"><Button variant="success">User  Jobs</Button></Nav.Link>
                                    </LinkContainer>
                                </>
                            ) : (
                                <>


                                </>
                            )}

                        </Nav>
                        <Nav>

                            {token ? (
                                <Button onClick={handleLogout} className="text-white" variant="danger">Logout</Button>
                            ) : (
                                <LinkContainer to='/'>
                                    <Button className="text-white">Login</Button>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                <ToastContainer />
            </Navbar>
        </>
    )
}

export default Header
