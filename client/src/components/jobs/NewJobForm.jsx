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
//             toast.error('Erro posting the job')
//         }
//     }
//     const handleInputChange =(e) =>{
//         setNewJob({...newJob, [e.target.name]: e.target.value})
//     }

//   return (
//     <>
//             <Container>
//             <Row className="justify-content-center">
//                 <Col xs={12} md={6}>
//                     <Card>
//                         <Card.Body>
//                             <Form onSubmit={handleSubmit}>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Company</Form.Label>
//                                     <Form.Control 
//                                         type="text" 
//                                         name="company" 
//                                         value={newJob.company} 
//                                         onChange={handleInputChange} 
//                                         placeholder="Enter company name" 
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Job Title</Form.Label>
//                                     <Form.Control 
//                                         type="text" 
//                                         name="jobTitle" 
//                                         value={newJob.jobTitle} 
//                                         onChange={handleInputChange} 
//                                         placeholder="Enter job title" 
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Comments</Form.Label>
//                                     <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     name="comments"
//                                     value={newJob.comments}
//                                     onChange={handleInputChange}
//                                     placeholder="Enter comments"
//                                     />

//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Job Email</Form.Label>
//                                     <Form.Control 
//                                         type="email" 
//                                         name="jobEmail" 
//                                         value={newJob.jobEmail} 
//                                         onChange={handleInputChange} 
//                                         placeholder="Enter job email" 
//                                     />
//                                 </Form.Group>
//                                 <Form.Group className="mb-3">
//                                     <Form.Label>Application Date</Form.Label>
//                                     <Form.Control 
//                                         type="date" 
//                                         name="applicationDate" 
//                                         value={newJob.applicationDate} 
//                                         onChange={handleInputChange} 
//                                     />
//                                 </Form.Group>
//                                 <Button 
//                                     variant="primary" 
//                                     type="submit" 
//                                 >
//                                     Submit
//                                 </Button>
//                             </Form>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//             <ToastContainer/>
//         </Container>
//     </>
//   )
// }

// export default NewJobForm

import React, { useState, useEffect } from "react";

const NewJobForm = () => {
    const [newJob, setNewJob] = useState({
        company: "",
        jobTitle: "",
        comments: "",
        jobEmail: "",
        applicationDate: new Date().toISOString().split('T')[0]
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!newJob.company.trim()) newErrors.company = "Company name is required";
        if (!newJob.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
        if (!newJob.jobEmail.trim()) newErrors.jobEmail = "Job email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newJob.jobEmail)) {
            newErrors.jobEmail = "Please enter a valid email address";
        }
        if (!newJob.applicationDate) newErrors.applicationDate = "Application date is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Mock success
            console.log('Job posted successfully', newJob);
            
            // Reset form
            setNewJob({
                company: "",
                jobTitle: "",
                comments: "",
                jobEmail: "",
                applicationDate: new Date().toISOString().split('T')[0]
            });
            
            // Show success message
            showToast('Job application added successfully!', 'success');
            
        } catch (error) {
            console.error('Error posting job:', error);
            showToast('Error adding job application', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewJob({...newJob, [name]: value});
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({...errors, [name]: ''});
        }
    };

    const showToast = (message, type) => {
        // Mock toast notification
        console.log(`${type}: ${message}`);
    };

    const styles = {
        container: {
            background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 35%, #16213e 100%)',
            minHeight: '100vh',
            padding: '40px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        formContainer: {
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto'
        },
        card: {
            background: 'rgba(30, 30, 46, 0.9)',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        header: {
            textAlign: 'center',
            marginBottom: '40px'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '10px'
        },
        subtitle: {
            color: '#94a3b8',
            fontSize: '1.1rem',
            marginBottom: '0'
        },
        formGroup: {
            marginBottom: '24px'
        },
        label: {
            display: 'block',
            fontSize: '0.95rem',
            fontWeight: '600',
            color: '#f1f5f9',
            marginBottom: '8px'
        },
        input: {
            width: '100%',
            padding: '14px 18px',
            border: '2px solid #334155',
            borderRadius: '16px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#1e293b',
            color: '#f1f5f9',
            fontFamily: 'inherit'
        },
        inputFocus: {
            borderColor: '#a855f7',
            boxShadow: '0 0 0 4px rgba(168, 85, 247, 0.2)',
            outline: 'none'
        },
        inputError: {
            borderColor: '#ef4444',
            boxShadow: '0 0 0 4px rgba(239, 68, 68, 0.2)'
        },
        textarea: {
            width: '100%',
            padding: '14px 18px',
            border: '2px solid #334155',
            borderRadius: '16px',
            fontSize: '1rem',
            transition: 'all 0.3s ease',
            backgroundColor: '#1e293b',
            color: '#f1f5f9',
            fontFamily: 'inherit',
            resize: 'vertical',
            minHeight: '100px'
        },
        errorMessage: {
            color: '#ef4444',
            fontSize: '0.875rem',
            marginTop: '6px',
            display: 'flex',
            alignItems: 'center'
        },
        submitButton: {
            width: '100%',
            padding: '16px 24px',
            background: 'linear-gradient(135deg, #a855f7 0%, #06b6d4 50%, #10b981 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '32px'
        },
        submitButtonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 25px rgba(168, 85, 247, 0.4)'
        },
        submitButtonDisabled: {
            opacity: '0.7',
            cursor: 'not-allowed',
            transform: 'none'
        },
        spinner: {
            width: '20px',
            height: '20px',
            border: '2px solid rgba(255,255,255,0.3)',
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginRight: '10px'
        },
        icon: {
            marginRight: '8px'
        },
        formRow: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px'
        },
        '@media (max-width: 768px)': {
            formRow: {
                gridTemplateColumns: '1fr'
            }
        }
    };

    // Add spinner animation
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            input:focus, textarea:focus {
                border-color: #a855f7 !important;
                box-shadow: 0 0 0 4px rgba(168, 85, 247, 0.2) !important;
                outline: none !important;
            }
            
            input::placeholder, textarea::placeholder {
                color: #64748b;
            }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.formContainer}>
                <div style={styles.card}>
                    <div style={styles.header}>
                        <h1 style={styles.title}>Add New Application</h1>
                        <p style={styles.subtitle}>Track your job search journey</p>
                    </div>
                    
                    <div onSubmit={handleSubmit}>
                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <span style={styles.icon}>🏢</span>
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    value={newJob.company}
                                    onChange={handleInputChange}
                                    placeholder="Enter company name"
                                    style={{
                                        ...styles.input,
                                        ...(errors.company ? styles.inputError : {})
                                    }}
                                />
                                {errors.company && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.icon}>⚠️</span>
                                        {errors.company}
                                    </div>
                                )}
                            </div>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <span style={styles.icon}>💼</span>
                                    Job Title
                                </label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={newJob.jobTitle}
                                    onChange={handleInputChange}
                                    placeholder="Enter job title"
                                    style={{
                                        ...styles.input,
                                        ...(errors.jobTitle ? styles.inputError : {})
                                    }}
                                />
                                {errors.jobTitle && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.icon}>⚠️</span>
                                        {errors.jobTitle}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={styles.formRow}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <span style={styles.icon}>📧</span>
                                    Contact Email
                                </label>
                                <input
                                    type="email"
                                    name="jobEmail"
                                    value={newJob.jobEmail}
                                    onChange={handleInputChange}
                                    placeholder="Enter contact email"
                                    style={{
                                        ...styles.input,
                                        ...(errors.jobEmail ? styles.inputError : {})
                                    }}
                                />
                                {errors.jobEmail && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.icon}>⚠️</span>
                                        {errors.jobEmail}
                                    </div>
                                )}
                            </div>
                            
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <span style={styles.icon}>📅</span>
                                    Application Date
                                </label>
                                <input
                                    type="date"
                                    name="applicationDate"
                                    value={newJob.applicationDate}
                                    onChange={handleInputChange}
                                    style={{
                                        ...styles.input,
                                        ...(errors.applicationDate ? styles.inputError : {})
                                    }}
                                />
                                {errors.applicationDate && (
                                    <div style={styles.errorMessage}>
                                        <span style={styles.icon}>⚠️</span>
                                        {errors.applicationDate}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <span style={styles.icon}>📝</span>
                                Notes (Optional)
                            </label>
                            <textarea
                                name="comments"
                                value={newJob.comments}
                                onChange={handleInputChange}
                                placeholder="Add any notes about this application..."
                                style={styles.textarea}
                            />
                        </div>

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            style={{
                                ...styles.submitButton,
                                ...(isSubmitting ? styles.submitButtonDisabled : {})
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <div style={styles.spinner}></div>
                                    Adding Application...
                                </>
                            ) : (
                                <>
                                    <span style={styles.icon}>✨</span>
                                    Add Application
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewJobForm;