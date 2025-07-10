// import React from 'react'
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { Container, ListGroup, Button, Row, Col, Badge } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from '../../ContextApi';
// import { backendApi } from "../../Api";

// const Home = () => {
//   const [jobs, setJobs] = useState([])
//   const [loading, setLoading] = useState({});
//   const [loading2, setLoading2] = useState({})
//   const { token } = useAuth()
//   const navigate = useNavigate()

//   const statusOptions = [
//     "Applied",
//     "Email Send",
//     "Followed-up",
//     "No Answer",
//     "Interview Scheduled",
//     "Interview Completed",
//     "Rejected",
//   ];
//   const fetchAllJobs = async () => {
//     try {
//       const response = await axios.get(`${backendApi}/jobs/getAllJobs`, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token
//         },
//       });
//       setJobs(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchAllJobs();
//   }, []);

//   const sendNewEmail = async (id) => {
//     console.log(id)
//     setLoading2(prev => ({ ...prev, [id]: true }))
//     try {
//       const response = await axios.post(`${backendApi}/jobs/newEmailSend/${id}`, {}, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token
//         }
//       })
//       toast.success('Email sent successfully', {
//         autoClose: 1000,
//         onClose: () => {
//           fetchAllJobs()
//         }
//       })
//     } catch (error) {
//       console.error(error)
//       toast.error('Error: Email not send')

//     } finally {
//       setLoading2(prev => ({ ...prev, [id]: false }))
//     }
//   }

//   const sendFollowUpEmail = async (id) => {
//     setLoading((prev) => ({ ...prev, [id]: true }));
//     console.log(id)
//     try {
//       const response = await axios.post(
//         `${backendApi}/jobs/followUpEmail/${id}`,
//         {}, // Include an empty object for the data argument
//         {
//           headers: {
//             Authorization: token
//           },
//         }
//       );
//       toast.success("Follow-up email sent successfully", {
//         autoClose: 1000,
//         onClose: () => {
//           fetchAllJobs();
//         }
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error('Error: Email not sent');
//     } finally {
//       setLoading((prev) => ({ ...prev, [id]: false }));
//     }
//   };

//   const handleStatusChange = async (id, newStatus) => {
//     try {
//       await axios.put(`${backendApi}/jobs/updateJobStatus/${id}`, { status: newStatus }, {
//         headers: {
//           Authorization: token
//         },
//       });
//       setJobs((prevJobs) =>
//         prevJobs.map(job =>
//           job._id === id ? { ...job, status: newStatus } : job
//         )
//       );
//       toast.success("Status updated successfully", {
//         autoClose: 1000,
//       });
//     } catch (error) {
//       console.error(error);
//       toast.error('Error: Status not updated');
//     }
//   };

//     const handleDelete = async (jobId) => {
//       try {
//         const response = await axios.delete(`${backendApi}/jobs/deleteJob/${jobId}`, {
//           headers: {
//             "Authorization": token
//           }
//         })
//         setJobs(jobs.filter(job => job._id !== jobId))
//         toast.success('Job deleted successfully', {
//           autoClose: 2000,
//           onClose: () => navigate('/')
//         })
//       } catch (error) {
//         console.error(error)
//         toast.error('Error deleting Job', {
//           autoClose: 2000,
//           onClose: () => navigate('/')
//         })
//       }
//     }

//   console.log(jobs)
//   return (
//     <div>
//       <Container>
//         <h1 className='text-white text-center mb-4'>All Jobs</h1>
//         <ListGroup>
//           {jobs.map((job, index) => (
//             <ListGroup.Item
//               key={index}
//               className={`flex-column flex-md-row align-items-center justify-content-between 
//                    p-3 ${job.status === 'Rejected' ? 'bg-danger text-white'
//                   : job.status === 'Email Send' ? 'bg-info text-white'
//                     : job.status === 'Interview Scheduled' ? 'bg-success text-white'
//                       : job.status === 'Followed-up' ? 'bg-primary text-white'
//                         : 'bg-dark text-light'}`}
//             >
//               <Row className="w-100">
//                 <Col md={4} className="d-flex flex-column align-items-center text-center text-md-start">
//                   <h5>{job.company}</h5>
//                   <Badge>
//                     <select
//                       value={job.status}
//                       onChange={(e) => handleStatusChange(job._id, e.target.value)}
//                       className="form-select mb-2"
//                     >
//                       {statusOptions.map((status) => (
//                         <option key={status} value={status}>
//                           {status}
//                         </option>
//                       ))}
//                     </select>
//                   </Badge>
//                   <Badge>{job.lastFollowUpDate !== null ? job.lastFollowUpDate.slice(0, 10) : ''}</Badge>
//                 </Col>
//                 <Col md={4} className="text-center">
//                   <h6>{job.jobTitle}</h6>
//                   <h6>{job.jobEmail}</h6>
//                   <p className="text-white text-center">{job.applicationDate.slice(0, 10)}</p>
//                 </Col>
//                 <Col md={4} className="d-flex justify-content-center justify-content-md-end align-items-center">
//                   <Button
//                     variant="outline-light"
//                     onClick={() => sendNewEmail(job._id)}
//                     className="mt-2 mt-md-0 me-2"
//                     disabled={loading[job._id]} // Disable button when loading
//                   >
//                     {loading2[job._id] ? 'Wait' : 'Send New Email'}
//                   </Button>
//                   <Button
//                     variant="outline-light"
//                     onClick={() => sendFollowUpEmail(job._id)}
//                     className="mt-2 mt-md-0"
//                     disabled={loading[job._id]} // Disable button when loading
//                   >
//                     {loading[job._id] ? 'Wait' : 'Send Follow-Up'}
//                   </Button>
//                   <Button
//                     variant="outline-danger"
//                     onClick={() => handleDelete(job._id)}
//                     className="mt-2 mt-md-0 ms-2"
//                   >
//                     Delete
//                   </Button>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col md={12} className='d-flex'>
//                   <h6 className='me-5'>{job.comments? 'Notes:' : ''}</h6>
//                   <p>{job.comments}</p>
//                 </Col>
//               </Row>
//             </ListGroup.Item>
//           ))}
//         </ListGroup>
//         <ToastContainer />
//       </Container>

//     </div>
//   )
// }

// export default Home
import React from 'react'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, ListGroup, Button, Row, Col, Badge, Card, Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from '../../ContextApi';
import { backendApi } from "../../Api";

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState({});
  const [loading2, setLoading2] = useState({})
  const { token } = useAuth()
  const navigate = useNavigate()

  const statusOptions = [
    "Applied",
    "Email Send",
    "Followed-up",
    "No Answer",
    "Interview Scheduled",
    "Interview Completed",
    "Rejected",
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Applied': 'bg-secondary',
      'Email Send': 'bg-info',
      'Followed-up': 'bg-primary',
      'No Answer': 'bg-warning text-dark',
      'Interview Scheduled': 'bg-success',
      'Interview Completed': 'bg-success',
      'Rejected': 'bg-danger'
    };
    return colors[status] || 'bg-secondary';
  };

  const getCardAccentColor = (status) => {
    const colors = {
      'Applied': '#6c757d',
      'Email Send': '#17a2b8',
      'Followed-up': '#007bff',
      'No Answer': '#ffc107',
      'Interview Scheduled': '#28a745',
      'Interview Completed': '#28a745',
      'Rejected': '#dc3545'
    };
    return colors[status] || '#6c757d';
  };

  const getCardGradient = (status) => {
    const gradients = {
      'Applied': 'linear-gradient(45deg, rgba(108, 117, 125, 0.1), rgba(108, 117, 125, 0.05))',
      'Email Send': 'linear-gradient(45deg, rgba(23, 162, 184, 0.1), rgba(23, 162, 184, 0.05))',
      'Followed-up': 'linear-gradient(45deg, rgba(0, 123, 255, 0.1), rgba(0, 123, 255, 0.05))',
      'No Answer': 'linear-gradient(45deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05))',
      'Interview Scheduled': 'linear-gradient(45deg, rgba(40, 167, 69, 0.1), rgba(40, 167, 69, 0.05))',
      'Interview Completed': 'linear-gradient(45deg, rgba(40, 167, 69, 0.1), rgba(40, 167, 69, 0.05))',
      'Rejected': 'linear-gradient(45deg, rgba(220, 53, 69, 0.1), rgba(220, 53, 69, 0.05))'
    };
    return gradients[status] || gradients['Applied'];
  };

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
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const sendNewEmail = async (id) => {
    console.log(id)
    setLoading2(prev => ({ ...prev, [id]: true }))
    try {
      const response = await axios.post(`${backendApi}/jobs/newEmailSend/${id}`, {}, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })
      toast.success('Email sent successfully', {
        autoClose: 1000,
        onClose: () => {
          fetchAllJobs()
        }
      })
    } catch (error) {
      console.error(error)
      toast.error('Error: Email not send')

    } finally {
      setLoading2(prev => ({ ...prev, [id]: false }))
    }
  }

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
        autoClose: 1000,
        onClose: () => {
          fetchAllJobs();
        }
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
        autoClose: 1000,
      });
    } catch (error) {
      console.error(error);
      toast.error('Error: Status not updated');
    }
  };

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

  console.log(jobs)
    const styles = {
    container: {
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    title: {
      color: 'white',
      fontSize: '3rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      textShadow: '0 2px 4px rgba(0,0,0,0.3)'
    },
    subtitle: {
      color: 'rgba(255,255,255,0.7)',
      fontSize: '1.2rem',
      marginBottom: '0'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto'
    },
    card: {
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      border: '2px solid',
      position: 'relative'
    },
    cardHeader: {
      padding: '20px',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      position: 'relative'
    },
    cardHeaderTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '10px'
    },
    companyName: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#ffffff',
      margin: '0 0 5px 0'
    },
    jobTitle: {
      fontSize: '0.9rem',
      color: '#a8a8b3',
      margin: '0'
    },
    statusBadge: {
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '0.75rem',
      fontWeight: '600',
      color: 'white',
      border: 'none',
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },
    cardBody: {
      padding: '20px',
      background: 'rgba(30, 30, 46, 0.95)'
    },
    infoRow: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px'
    },
    icon: {
      marginRight: '8px',
      fontSize: '1rem'
    },
    infoText: {
      fontSize: '0.85rem',
      color: '#a8a8b3',
      margin: '0'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      fontSize: '0.8rem',
      color: '#a8a8b3',
      marginBottom: '5px',
      fontWeight: '500'
    },
    select: {
      width: '100%',
      padding: '8px 12px',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.2)',
      fontSize: '0.875rem',
      backgroundColor: 'rgba(40, 40, 60, 0.8)',
      color: '#ffffff'
    },
    notesContainer: {
      padding: '12px',
      backgroundColor: 'rgba(40, 40, 60, 0.6)',
      borderRadius: '12px',
      border: '1px solid rgba(255,255,255,0.1)'
    },
    notesText: {
      fontSize: '0.85rem',
      color: '#e4e4e7',
      margin: '0'
    },
    cardFooter: {
      padding: '20px',
      paddingTop: '0',
      background: 'rgba(30, 30, 46, 0.95)'
    },
    buttonGroup: {
      display: 'flex',
      gap: '8px',
      marginBottom: '10px'
    },
    button: {
      flex: 1,
      padding: '10px 16px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '0.875rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    primaryButton: {
      background: 'linear-gradient(45deg, #3b82f6, #1d4ed8)',
      color: 'white'
    },
    outlineButton: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#60a5fa',
      border: '1px solid rgba(59, 130, 246, 0.3)'
    },
    dangerButton: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#f87171',
      border: '1px solid rgba(239, 68, 68, 0.3)',
      width: '100%'
    },
    spinner: {
      width: '16px',
      height: '16px',
      border: '2px solid rgba(255,255,255,0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      marginRight: '8px'
    },
    emptyState: {
      textAlign: 'center',
      padding: '60px 20px',
      color: 'rgba(255,255,255,0.7)'
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '20px'
    },
    emptyTitle: {
      fontSize: '1.5rem',
      color: 'white',
      marginBottom: '10px'
    }
  };

  // Add keyframes for spinner animation
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Job Applications</h1>
        <p style={styles.subtitle}>Track your career journey</p>
      </div>
      
      <div style={styles.grid}>
        {jobs.map((job, index) => (
          <div 
            key={index} 
            style={{
              ...styles.card,
              borderColor: getCardAccentColor(job.status),
              boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 0 1px ${getCardAccentColor(job.status)}20`
            }}
          >
            <div 
              style={{
                ...styles.cardHeader,
                background: getCardGradient(job.status)
              }}
            >
              <div style={styles.cardHeaderTop}>
                <div>
                  <h5 style={styles.companyName}>{job.company}</h5>
                  <p style={styles.jobTitle}>{job.jobTitle}</p>
                </div>
                <div 
                  style={{
                    ...styles.statusBadge,
                    backgroundColor: getCardAccentColor(job.status),
                    boxShadow: `0 4px 12px ${getCardAccentColor(job.status)}40`
                  }}
                >
                  {job.status}
                </div>
              </div>
            </div>
            
            <div style={styles.cardBody}>
              <div style={styles.infoRow}>
                <span style={styles.icon}>📧</span>
                <small style={styles.infoText}>{job.jobEmail}</small>
              </div>
              <div style={styles.infoRow}>
                <span style={styles.icon}>📅</span>
                <small style={styles.infoText}>Applied: {job.applicationDate.slice(0, 10)}</small>
              </div>
              {job.lastFollowUpDate && (
                <div style={styles.infoRow}>
                  <span style={styles.icon}>🔄</span>
                  <small style={styles.infoText}>Last follow-up: {job.lastFollowUpDate.slice(0, 10)}</small>
                </div>
              )}

              <div style={styles.formGroup}>
                <label style={styles.label}>Update Status</label>
                <select
                  value={job.status}
                  onChange={(e) => handleStatusChange(job._id, e.target.value)}
                  style={{
                    ...styles.select,
                    borderColor: getCardAccentColor(job.status) + '40'
                  }}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              {job.comments && (
                <div style={styles.formGroup}>
                  <label style={styles.label}>Notes</label>
                  <div style={styles.notesContainer}>
                    <p style={styles.notesText}>{job.comments}</p>
                  </div>
                </div>
              )}
            </div>

            <div style={styles.cardFooter}>
              <div style={styles.buttonGroup}>
                <button
                  style={{
                    ...styles.button,
                    ...styles.primaryButton
                  }}
                  onClick={() => sendNewEmail(job._id)}
                  disabled={loading2[job._id]}
                >
                  {loading2[job._id] ? (
                    <div style={styles.spinner}></div>
                  ) : (
                    <span style={{marginRight: '8px'}}>📧</span>
                  )}
                  {loading2[job._id] ? 'Sending...' : 'New Email'}
                </button>
                <button
                  style={{
                    ...styles.button,
                    ...styles.outlineButton
                  }}
                  onClick={() => sendFollowUpEmail(job._id)}
                  disabled={loading[job._id]}
                >
                  {loading[job._id] ? (
                    <div style={styles.spinner}></div>
                  ) : (
                    <span style={{marginRight: '8px'}}>🔄</span>
                  )}
                  {loading[job._id] ? 'Sending...' : 'Follow-up'}
                </button>
              </div>
              <button
                style={{
                  ...styles.button,
                  ...styles.dangerButton
                }}
                onClick={() => handleDelete(job._id)}
              >
                <span style={{marginRight: '8px'}}>🗑️</span>
                Delete Application
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {jobs.length === 0 && (
        <div style={styles.emptyState}>
          <div style={styles.emptyIcon}>📋</div>
          <h3 style={styles.emptyTitle}>No applications yet</h3>
          <p>Start tracking your job applications to see them here</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;