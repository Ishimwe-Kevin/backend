const express = require('express');
const app = express();
const port = 3000;

// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files (for front-end if needed)
app.use(express.static('public'));

// API endpoint for timestamp
app.get('/api/:date?', (req, res) => {
  let date;
  
  // Handle empty date parameter
  if (!req.params.date) {
    date = new Date();
    return res.json({
      unix: date.getTime(),
      utc: date.toUTCString()
    });
  }

  // Check if the input is a Unix timestamp (number)
  const isUnix = /^\d+$/.test(req.params.date);
  
  if (isUnix) {
    date = new Date(parseInt(req.params.date));
  } else {
    date = new Date(req.params.date);
  }

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // Return valid date response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});