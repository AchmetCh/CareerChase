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
        comments: "",
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
            <Container data-bs-theme="dark">
                <h1 className="text-center text-light my-4">Create New Job Application</h1>
                <p className="text-center text-light mb-4">Track your job applications efficiently</p>
            
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
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="comments"
                                    value={newJob.comments}
                                    onChange={handleInputChange}
                                    placeholder="Enter comments"
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



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { backendApi } from "../../Api";
// import { useAuth } from '../../ContextApi';

// const NewJobForm = () => {
//     const [newJob, setNewJob] = useState({
//         company: "",
//         jobTitle: "",
//         comments: "",
//         jobEmail: "",
//         applicationDate: new Date().toISOString().split('T')[0]
//     })
//     const {token} = useAuth()
//     const navigate = useNavigate()

//     const handleSubmit = async(e) => {
//         e.preventDefault()
//         try {
//             const response = await axios.post(`${backendApi}/jobs/newJob`, newJob, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: token
//                     }
//             })
//             toast.success('Job posted successfully', {
//                 autoClose: 2000,
//                 onClose: () => navigate('/')
//             })
//         } catch (error) {
//             toast.error('Error posting the job')
//         }
//     }
    
//     const handleInputChange = (e) => {
//         setNewJob({...newJob, [e.target.name]: e.target.value})
//     }

//     // Custom dark theme styles
//     const darkStyles = {
//         body: {
//             backgroundColor: '#0d1117',
//             color: '#e6edf3',
//             minHeight: '100vh',
//             fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
//         },
//         card: {
//             backgroundColor: '#161b22',
//             border: '1px solid #30363d',
//             borderRadius: '12px',
//             boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
//         },
//         formControl: {
//             backgroundColor: '#0d1117',
//             border: '1px solid #30363d',
//             color: '#e6edf3',
//             borderRadius: '8px',
//             padding: '12px 16px',
//             fontSize: '14px',
//             transition: 'all 0.2s ease'
//         },
//         formControlFocus: {
//             backgroundColor: '#0d1117',
//             borderColor: '#58a6ff',
//             boxShadow: '0 0 0 0.2rem rgba(88, 166, 255, 0.25)',
//             color: '#e6edf3'
//         },
//         label: {
//             color: '#f0f6fc',
//             fontWeight: '500',
//             marginBottom: '8px',
//             fontSize: '14px'
//         },
//         button: {
//             backgroundColor: '#238636',
//             border: 'none',
//             borderRadius: '8px',
//             padding: '12px 24px',
//             fontSize: '14px',
//             fontWeight: '500',
//             transition: 'all 0.2s ease',
//             width: '100%'
//         },
//         buttonHover: {
//             backgroundColor: '#2ea043',
//             transform: 'translateY(-1px)',
//             boxShadow: '0 4px 12px rgba(35, 134, 54, 0.3)'
//         },
//         title: {
//             color: '#f0f6fc',
//             fontSize: '24px',
//             fontWeight: '600',
//             marginBottom: '8px',
//             textAlign: 'center'
//         },
//         subtitle: {
//             color: '#8b949e',
//             fontSize: '14px',
//             textAlign: 'center',
//             marginBottom: '32px'
//         }
//     }

//     return (
//         <>
//             <div style={darkStyles.body}>
//                 <Container className="py-5">
//                     <Row className="justify-content-center">
//                         <Col xs={12} md={8} lg={6}>
//                             <div style={darkStyles.title}>
//                                 Create New Job Application
//                             </div>
//                             <div style={darkStyles.subtitle}>
//                                 Track your job applications efficiently
//                             </div>
                            
//                             <Card style={darkStyles.card}>
//                                 <Card.Body className="p-4">
//                                     <Form onSubmit={handleSubmit}>
//                                         <Form.Group className="mb-4">
//                                             <Form.Label style={darkStyles.label}>
//                                                 Company Name
//                                             </Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="company" 
//                                                 value={newJob.company} 
//                                                 onChange={handleInputChange} 
//                                                 placeholder="Enter company name" 
//                                                 style={darkStyles.formControl}
//                                                 onFocus={(e) => Object.assign(e.target.style, darkStyles.formControlFocus)}
//                                                 onBlur={(e) => Object.assign(e.target.style, darkStyles.formControl)}
//                                                 required
//                                             />
//                                         </Form.Group>
                                        
//                                         <Form.Group className="mb-4">
//                                             <Form.Label style={darkStyles.label}>
//                                                 Job Title
//                                             </Form.Label>
//                                             <Form.Control 
//                                                 type="text" 
//                                                 name="jobTitle" 
//                                                 value={newJob.jobTitle} 
//                                                 onChange={handleInputChange} 
//                                                 placeholder="Enter job title" 
//                                                 style={darkStyles.formControl}
//                                                 onFocus={(e) => Object.assign(e.target.style, darkStyles.formControlFocus)}
//                                                 onBlur={(e) => Object.assign(e.target.style, darkStyles.formControl)}
//                                                 required
//                                             />
//                                         </Form.Group>
                                        
//                                         <Form.Group className="mb-4">
//                                             <Form.Label style={darkStyles.label}>
//                                                 Comments
//                                             </Form.Label>
//                                             <Form.Control
//                                                 as="textarea"
//                                                 rows={4}
//                                                 name="comments"
//                                                 value={newJob.comments}
//                                                 onChange={handleInputChange}
//                                                 placeholder="Enter any additional comments or notes about this application..."
//                                                 style={{...darkStyles.formControl, resize: 'vertical'}}
//                                                 onFocus={(e) => Object.assign(e.target.style, {...darkStyles.formControlFocus, resize: 'vertical'})}
//                                                 onBlur={(e) => Object.assign(e.target.style, {...darkStyles.formControl, resize: 'vertical'})}
//                                             />
//                                         </Form.Group>
                                        
//                                         <Form.Group className="mb-4">
//                                             <Form.Label style={darkStyles.label}>
//                                                 Contact Email
//                                             </Form.Label>
//                                             <Form.Control 
//                                                 type="email" 
//                                                 name="jobEmail" 
//                                                 value={newJob.jobEmail} 
//                                                 onChange={handleInputChange} 
//                                                 placeholder="Enter contact email" 
//                                                 style={darkStyles.formControl}
//                                                 onFocus={(e) => Object.assign(e.target.style, darkStyles.formControlFocus)}
//                                                 onBlur={(e) => Object.assign(e.target.style, darkStyles.formControl)}
//                                                 required
//                                             />
//                                         </Form.Group>
                                        
//                                         <Form.Group className="mb-4">
//                                             <Form.Label style={darkStyles.label}>
//                                                 Application Date
//                                             </Form.Label>
//                                             <Form.Control 
//                                                 type="date" 
//                                                 name="applicationDate" 
//                                                 value={newJob.applicationDate} 
//                                                 onChange={handleInputChange} 
//                                                 style={darkStyles.formControl}
//                                                 onFocus={(e) => Object.assign(e.target.style, darkStyles.formControlFocus)}
//                                                 onBlur={(e) => Object.assign(e.target.style, darkStyles.formControl)}
//                                                 required
//                                             />
//                                         </Form.Group>
                                        
//                                         <Button 
//                                             variant="success" 
//                                             type="submit" 
//                                             style={darkStyles.button}
//                                             onMouseEnter={(e) => Object.assign(e.target.style, darkStyles.buttonHover)}
//                                             onMouseLeave={(e) => Object.assign(e.target.style, darkStyles.button)}
//                                         >
//                                             Create Job Application
//                                         </Button>
//                                     </Form>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Container>
//             </div>
            
//             <ToastContainer
//                 position="top-right"
//                 autoClose={3000}
//                 hideProgressBar={false}
//                 newestOnTop={false}
//                 closeOnClick
//                 rtl={false}
//                 pauseOnFocusLoss
//                 draggable
//                 pauseOnHover
//                 theme="dark"
//             />
//         </>
//     )
// }

// export default NewJobForm