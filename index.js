const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
const customers = require("./DB/Customer");
const transactions = require("./DB/Transaction");

// Express server
const app = express();
app.use(cors());
dotenv.config();

// APIs
app.get("/api/customers", (req, res) => {
  res.json(customers);
});

app.get("/api/customers/joined", (req, res) => {
  res.json(
    customers.map((customer) => {
      const customerTransactions = transactions.filter(
        (transaction) => transaction.customer_id === customer.id
      );
      return {
        ...customer,
        transactions: customerTransactions,
      };
    })
  );
});

app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

app.get("/api/transactions/joined", (req, res) => {
  res.json(
    transactions.map((transaction) => {
      const customer = customers.find(
        (customer) => customer.id === transaction.customer_id
      );
      return {
        ...transaction,
        customer: customer,
      };
    })
  );
});

// Server listenning
const PORT = 3000;
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
