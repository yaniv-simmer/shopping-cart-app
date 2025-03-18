const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan'); // Import morgan
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(morgan('dev')); // Use morgan to log requests
app.use('/assets', express.static(path.join(__dirname, 'data/assets')));

// users map to store registered users
let users = new Map();
let products = [];

fs.createReadStream('data/products.csv')
  .pipe(csv())
  .on('data', (row) => {
    row.imageUrl = `http://localhost:${PORT}/assets/${row.image}`;
    products.push(row);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });

// GET API to return products
app.get('/getProducts', (req, res) => {
  res.json(products);
});

// Simple register
app.post('/register', (req, res) => {
  let newUserEmail = req.body.email;
  let newUserPassword = req.body.password;

  if (users.has(newUserEmail)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.set(newUserEmail, newUserPassword);
  res.json({ message: 'User registered successfully' });
});

// Simple login
app.post('/login', (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;

  if (!users.has(userEmail) || users.get(userEmail) !== userPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});