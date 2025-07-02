const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS
app.use(cors());

// Root endpoint (not tested by FCC, just for display)
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// API endpoint
app.get("/api/:date?", (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // If no date is provided, use current date
  if (!date) {
    parsedDate = new Date();
  } else if (/^\d+$/.test(date)) {
    // If it's a number (Unix timestamp in milliseconds)
    parsedDate = new Date(parseInt(date));
  } else {
    // Try parsing as a date string
    parsedDate = new Date(date);
  }

  // Check if the date is valid
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
