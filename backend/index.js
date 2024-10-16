const express = require('express');
require('./connections/conn'); // MongoDB connection
const cors = require('cors');
const dataRoutes = require('./routes/dataRoutes'); // Import the routes

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// Use the routes
app.use('/api', dataRoutes); // API will be available at /api/data and /api/data/filter

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
