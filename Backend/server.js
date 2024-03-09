const express = require('express');
const bp = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const multer = require('multer');
const jwt = require("jsonwebtoken");
const http = require('http');
const employeeAuth = require('./middleware/employeeAuth');
const axios = require("axios");
dotenv.config(); // Load environment variables
const corsOptions = {
  origin: ['http://localhost:3001', ''],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials']
};
app.use(cors(corsOptions));
app.use(morgan("tiny"));
app.use(bp.json());
app.use(express.static('public'))
app.use(cookieParser());
app.use(bp.urlencoded({extended: true}))
app.use('', userRouter);
const server = http.createServer(app);
mongoose.set('strictQuery', false); // or true
const PORT =  3000;
const DB_CONNECT = process.env.DB_CONNECT; // Corrected DB_CONNECT variable
// Connecting our database
// mongoose.connect(DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('MongoDB connected...');
//   })
//   .catch(err => console.error('Error connecting to MongoDB:', err)); // Add error handlingon
mongoose.connect("mongodb+srv://thuraijathusan:suthu123@cluster0.b0tqdnb.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
server.listen(PORT, () => {
  console.log(`Server started on port 3000`);
});

