const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());

// Home route
app.get("/", (req, res) => {
  res.send("Timestamp Microservice");
});

// API route
app.get("/api/:date?", (req, res) => {
  const dateParam = req.params.date;

  let date;

  // If no date parameter, use current date
  if (!dateParam) {
    date = new Date();
  } else {
    // If it's a Unix timestamp in milliseconds (only digits), parse it as an integer
    if (/^\d+$/.test(dateParam)) {
      date = new Date(parseInt(dateParam));
    } else {
      date = new Date(dateParam);
    }
  }

  // Check for invalid date
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Return JSON response
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
