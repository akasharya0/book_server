// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// dotenv.config();

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Import the routes
// const authRoutes = require('./server');
// const bookRoutes = require('./book');

// // Use the routes
// app.use('/app', bookRoutes);  // All book-related routes will now be prefixed with /app
// app.use('/auth', authRoutes); // All auth-related routes will now be prefixed with /auth

// // Start the server
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });

const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Import your routes
const authRoutes = require('./server');
const bookRoutes = require('./book'); // renamed from index.js to avoid confusion

// Prefix routes
app.use('/auth', authRoutes);
app.use('/app', bookRoutes);

module.exports = app;
module.exports.handler = serverless(app);
