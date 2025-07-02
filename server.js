const express = require("express");
const cors = require("cors");
const app = express();

// Enable CORS for FCC testing
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// API route
app.get("/api/:date?", (req, res) => {
  let dateString = req.params.date;

  let date;
  // If no date param, use current date
  if (!dateString) {
    date = new Date();
  } else {
    // If dateString is a number, parse as integer
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }

  // Check if date is valid
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
