import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../../ContextApi';
import { backendApi } from "../../Api";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useAuth();
 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${backendApi}/user/login`, {
                email,
                password
            });

            const token = response.data.token;
            await login(token); // Use the login function from context
            toast.success('Login Successful', {
                autoClose: 2000,
                onClose: () => setTimeout(() => navigate('/'), 2000)
            });
        } catch (error) {
            toast.error('Invalid Email or Password', {
                autoClose: 2000,
            });
        }
    };

    return (
        <div>
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "50vh" }}
            >
                <Card className="p-4" style={{ width: "400px" }}>
                    <h2>Login</h2>

                    <Form onSubmit={handleLogin} className="mx-auto mx-3">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mx-auto w-100 m-3"
                        >
                            Login
                        </Button>
                    </Form>
                </Card>
            </Container>
            <ToastContainer />
        </div>
    )
}

export default Login