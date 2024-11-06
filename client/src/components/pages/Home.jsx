import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, ListGroup, Button, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../../ContextApi';
import { backendApi } from "../../Api";

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState({});
  const { token } = useAuth()

  const statusOptions = [
    "Applied",
    "Followed-up",
    "No Answer",
    "Interview Scheduled",
    "Interview Completed",
    "Rejected",
  ];

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await axios.get(`${backendApi}/jobs/getAllJobs`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          },
        });
        setJobs(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAllJobs();
  }, [])

  const sendFollowUpEmail = async (id) => {
    setLoading((prev) => ({ ...prev, [id]: true }));
    console.log(id)
    try {
      const response = await axios.post(
        `${backendApi}/jobs/followUpEmail/${id}`,
        {}, // Include an empty object for the data argument
        {
          headers: {
            Authorization: token
          },
        }
      );
      toast.success("Follow-up email sent successfully", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error: Email not sent');
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${backendApi}/jobs/updateJobStatus/${id}`, { status: newStatus }, {
        headers: {
          Authorization: token
        },
      });
      setJobs((prevJobs) =>
        prevJobs.map(job =>
          job._id === id ? { ...job, status: newStatus } : job
        )
      );
      toast.success("Status updated successfully", {
        autoClose: 2000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error: Status not updated');
    }
  };

  console.log(jobs)
  return (
    <div>
      <Container>
        <h1 className='text-white text-center mb-4'>All Jobs</h1>
        <ListGroup>
          {jobs.map((job, index) => (
            <ListGroup.Item
              key={index}
              className={`d-flex flex-column flex-md-row align-items-center justify-content-between 
              p-3 ${job.status === 'Rejected' ? 'bg-danger text-white'
                  : job.status === 'Interview Scheduled' ? 'bg-success'
                    : job.status === 'Followed-up' ? 'bg-primary'
                      : 'bg-dark text-light'}`}
            >
              <Row className="w-100">
                <Col md={4} className="d-flex flex-column align-items-center text-center text-md-start">
                  <h5>{job.company}</h5>
                  <Badge>
                    <select
                      value={job.status}
                      onChange={(e) => handleStatusChange(job._id, e.target.value)}
                      className="form-select mb-2"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </Badge>
                  <Badge>{job.lastFollowUpDate !== null ? job.lastFollowUpDate.slice(0, 10) : ''}</Badge>
                </Col>
                <Col md={4} className="text-center">
                  <h6>{job.jobTitle}</h6>
                  <p className="text-white text-center">{job.applicationDate.slice(0, 10)}</p>
                </Col>
                <Col md={4} className="d-flex justify-content-center justify-content-md-end align-items-center">
                  <Button
                    variant="outline-light"
                    onClick={() => sendFollowUpEmail(job._id)}
                    className="mt-2 mt-md-0"
                    disabled={loading[job._id]} // Disable button when loading
                  >
                    {loading[job._id] ? 'Wait' : 'Send Follow-Up'}
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <ToastContainer />
      </Container>

    </div>
  )
}

export default Home