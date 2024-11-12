import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendApi } from "../../Api";
import { useAuth } from '../../ContextApi';




const NewJobForm = () => {
    const [newJob, setNewJob] = useState({
        company: "",
        jobTitle: "",
        jobEmail: "",
        applicationDate: new Date().toISOString().split('T')[0]
    })
    const {token} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${backendApi}/jobs/newJob`, newJob, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                    }
            })
            toast.success('Job posted successfully', {
                autoClose: 2000,
                onClose: () => navigate('/')
            })
        } catch (error) {
            toast.error('Erro posting the job')
        }
    }
    const handleInputChange =(e) =>{
        setNewJob({...newJob, [e.target.name]: e.target.value})
    }

  return (
    <>
            <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="company" 
                                        value={newJob.company} 
                                        onChange={handleInputChange} 
                                        placeholder="Enter company name" 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Title</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="jobTitle" 
                                        value={newJob.jobTitle} 
                                        onChange={handleInputChange} 
                                        placeholder="Enter job title" 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Job Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        name="jobEmail" 
                                        value={newJob.jobEmail} 
                                        onChange={handleInputChange} 
                                        placeholder="Enter job email" 
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Application Date</Form.Label>
                                    <Form.Control 
                                        type="date" 
                                        name="applicationDate" 
                                        value={newJob.applicationDate} 
                                        onChange={handleInputChange} 
                                    />
                                </Form.Group>
                                <Button 
                                    variant="primary" 
                                    type="submit" 
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <ToastContainer/>
        </Container>
    </>
  )
}

export default NewJobForm