import express from "express";

const app = express();

app.use(express.static("public",{maxAge:2000000}));


const PORT = 3221;
app.listen(PORT, "0.0.0.0", () => {
  
  console.log(`Frontend Server ready at http://localhost:${PORT}`);
});
