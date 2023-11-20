const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'build')));

// Parse JSON and URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Handle form submissions
app.post('/send-email', (req, res) => {
  
  const formData = req.body;

  // Process the form data here
  console.log('Form Data:', formData);


  // Respond to the client
  res.status(200).send('Form Data Received');
});

// Start the server
const port = process.env.PORT || 3300;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

