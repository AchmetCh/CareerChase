import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup, Button, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendApi } from "../../Api";
import { useAuth } from '../../ContextApi';

const UserJobs = () => {
  const { userId, token } = useAuth()
  const [jobs, setJobs] = useState([])
  const { id } = useParams()
  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const response = await axios.get(`${backendApi}/jobs/getJobById/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              "Authorization": token
            }
          })
        setJobs(response.data)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserJobs()
  }, [])
  console.log(userId)
  return (
    <>
    <Container>
      <h1>My Jobs</h1>
      <ListGroup>
        {jobs.map((job, index) => (
          <ListGroup.Item key={index}>
            <Row>
              <Col xs={6}>
              <h5>{job.title}</h5>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
    <ToastContainer />
    <ToastContainer />
    </>
  )
}

export default UserJobs