import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendApi } from "../../Api";
import { useAuth } from '../../ContextApi';

const EditJob = () => {
    const [job, setJob] = useState({});
    const { id } = useParams()
    const navigate = useNavigate();
    const { userId, token } = useAuth()

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`${backendApi}/jobs/getJobById/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                });
                setJob(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchJob();
    }, [])
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${backendApi}/jobs/updateJob/${id}`, job, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                    },
                    });
                    toast.success("Job updated successfully", {
                        autoClose: 2000,
                        onClose: () => navigate('/')
                    });
        } catch (error) {
            console.error(error);
            toast.error('Error updating job', {
                autoClose: 2000,
                onClose: () => navigate('/')
            })      
        }
    }
    const handleInputChange =(e) =>{
        setJob({...job, [e.target.name]: e.target.value})
    }
    console.log(job)
    return (
        <>
        <Container>
        <Row className="justify-content-center">
            <Col xs={12} md={6}>
                <Card>
                    <Card.Body>
                        <Form onSubmit={handleUpdate}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="company" 
                                    value={job.company} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter company name" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="jobTitle" 
                                    value={job.jobTitle} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter job title" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Job Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    name="jobEmail" 
                                    value={job.jobEmail} 
                                    onChange={handleInputChange} 
                                    placeholder="Enter job email" 
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Application Date</Form.Label>
                                <Form.Control 
                                    type="date" 
                                    name="applicationDate" 
                                    value={job.applicationDate?.slice(0, 10) || ''}  
                                    onChange={handleInputChange} 
                                />
                            </Form.Group>
                            <Button 
                                variant="primary" 
                                type="submit" 
                            >
                                Submit Updates
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

export default EditJob