// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const preferencesRoutes = require('./routes/preferences');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, // useNewUrlParser is deprecated and has no effect in the new driver versions
  useUnifiedTopology: true // useUnifiedTopology is deprecated and has no effect in the new driver versions
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/preferences', preferencesRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
