const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the React app build directory
app.use(express.static(path.join(__dirname, "dist")));

// Serve the resume.pdf file
app.use(
  "/resume.pdf",
  express.static(path.join(__dirname, "public", "resume.pdf"))
);

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Portfolio website is running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to view the site`);
});
