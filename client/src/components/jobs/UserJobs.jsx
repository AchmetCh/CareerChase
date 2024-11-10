import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card, Button, Row, Col, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backendApi } from "../../Api";
import { useAuth } from '../../ContextApi';

const UserJobs = () => {
    const { userId, token } = useAuth()
    console.log(userId)
  return (
    <div>UserJobs</div>
  )
}

export default UserJobs