const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000
app.use(express.json())

app.options('*', cors())
app.use(cors({
    origin: '*', // Allow multiple origins
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true, // Enable credentials if needed
    optionsSuccessStatus: 200
  }));

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })