const express = require('express')
const cors = require('cors')
const db = require('./config/db')
const authRoutes = require('./routes/AuthRoutes')
const jobRoutes = require('./routes/JobRoutes')
const app = express()
const port = 8000
const cookieParser = require('cookie-parser');
app.use(express.json())

app.options('*', cors())
app.use(cors({
    origin: '*', // Allow multiple origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Enable credentials if needed
    optionsSuccessStatus: 200
  }));
  app.use(cookieParser());

  app.use('/user', authRoutes)
  app.use('/jobs', jobRoutes)

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })