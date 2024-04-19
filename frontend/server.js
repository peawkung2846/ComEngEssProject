import express from "express";

const app = express();

app.use(express.static("public"));

app.get('../res/', function(req, res) {
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  // Other response logic...
});

const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});
