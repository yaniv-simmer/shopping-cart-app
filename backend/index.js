const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const app = express();

const PORT = 3000;
const PRODUCTS_CSV_PATH = 'data/products.csv';
const MSG_PRODUCTS_LOADED = 'Products loaded successfully';


app.use(cors());
app.use(express.json());
app.use(morgan('dev')); 
app.use('/assets', express.static(path.join(__dirname, 'data/assets')));

let users = new Map();
let products = [];

fs.createReadStream(PRODUCTS_CSV_PATH)
  .pipe(csv())
  .on('data', (row) => {
    row.imageUrl = `http://localhost:${PORT}/assets/${row.image}`;
    products.push(row);
  })
  .on('end', () => {
    console.log(MSG_PRODUCTS_LOADED);
  });

app.get('/getProducts', (req, res) => {
  res.json(products);
});

app.post('/register', (req, res) => {
  //TODO: Implement JWT
  let newUserEmail = req.body.email;
  let newUserPassword = req.body.password;

  if (users.has(newUserEmail)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  users.set(newUserEmail, newUserPassword);
  res.json({ message: 'User registered successfully' });
});

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