const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");

// Express server
const app = express();
app.use(cors());
dotenv.config();


// APIs
app.get("/api/customers/", (req, res) => {
  const customers = require("./DB/Customer");
  res.json(customers);
});

app.get("/api/transactions/", (req, res) => {
  const transactions = require("./DB/Transaction");
  res.json(transactions);
});

// Server running
const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
