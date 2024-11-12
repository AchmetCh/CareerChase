import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, ListGroup, Button, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendApi } from "../../Api";
import { useAuth } from '../../ContextApi';

const UserJobs = () => {
  const { userId, token } = useAuth()
  const [jobs, setJobs] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const response = await axios.get(`${backendApi}/jobs/getUserJobs/${userId}`,
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

  const handleDelete = async (jobId) => {
    try {
      const response = await axios.delete(`${backendApi}/jobs/deleteJob/${jobId}`, {
        headers: {
          "Authorization": token
        }
      })
      setJobs(jobs.filter(job => job._id !== jobId))
      toast.success('Job deleted successfully', {
        autoClose: 2000,
        onClose: () => navigate('/')
      })
    } catch (error) {
      console.error(error)
      toast.error('Error deleting Job', {
        autoClose: 2000,
        onClose: () => navigate('/')
      })
    }
  }
  return (
    <>
      <Container>
        <h1>My Jobs</h1>
        <ListGroup>
          {jobs.map((job, index) => (
            <ListGroup.Item key={index}>
              <Row>
                <Col xs={2}>
                  <h4>Company name</h4>
                  <h5>{job.company}</h5>
                </Col>
                <Col>
                  <h4>Job Title</h4>
                  <h5>{job.jobTitle}</h5>
                </Col>
                <Col>
                  <h4>Application Date</h4>
                  <h5>{job.applicationDate.slice(0, 10)}</h5>
                </Col>
                <Col xs={2}>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(job._id)}>Delete Job</Button>
                </Col>
                <Col xs={2}>
                <Link to={`/jobs/updateJob/${job._id}`}>
                      <Button variant="success" className="m-2">Edit</Button>
                    </Link>
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