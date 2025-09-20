// Local development server for testing Vercel serverless functions
// This file is only used for local development and won't be deployed

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Import and use the serverless functions
const initiateHandler = require('./payment/initiate.js').default;
const callbackHandler = require('./payment/callback.js').default;
const statusHandler = require('./payment/status.js').default;
const healthHandler = require('./health.js').default;

// Route handlers
app.post('/api/payment/initiate', (req, res) => {
  initiateHandler(req, res);
});

app.post('/api/payment/callback', (req, res) => {
  callbackHandler(req, res);
});

app.post('/api/payment/status', (req, res) => {
  statusHandler(req, res);
});

app.get('/api/health', (req, res) => {
  healthHandler(req, res);
});

// Serve static files from React build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
  });
}

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Development server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

module.exports = app;
