const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const workersRouter = require('./routes/workers');

const app = express();
const PORT = 3000;

app.use(cors());

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`Received ${req.method} request to ${req.url}`);
  next();
});

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://aondoaver:6vxENVGECN2ySyAU@cluster0.q0i1kih.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// API Routes
app.use('/workers', workersRouter);

// Middleware to log outgoing responses
app.use((req, res, next) => {
  console.log(`Sent response with status ${res.statusCode}`);
  next();
});


const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  // Close the server and exit the process
  server.close(() => process.exit(1));
});
