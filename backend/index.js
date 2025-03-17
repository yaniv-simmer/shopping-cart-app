const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

let products = [];
fs.createReadStream('products.csv')
  .pipe(csv())
  .on('data', (row) => {
    products.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// GET API to return products
app.get('/getProducts', (req, res) => {
  res.json(products);
});

// Optional: Simple register and login endpoints
app.post('/register', (req, res) => {
  // Registration logic (e.g., store in-memory or in a file)
  res.json({ message: 'User registered' });
});

app.post('/login', (req, res) => {
  // Login logic
  res.json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
