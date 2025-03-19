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

// Load products from CSV file
fs.createReadStream(PRODUCTS_CSV_PATH)
  .pipe(csv())
  .on('data', (row) => {
    row.imageUrl = `http://localhost:${PORT}/assets/${row.image}`;
    products.push(row);
  })
  .on('end', () => {
    console.log(MSG_PRODUCTS_LOADED);
  });

/**
 * Route to get the list of products.
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} JSON response containing an array of products
 * @example
 * // Example response
 * [
 *   {
 *     "id": "1",
 *     "name": "Product 1",
 *     "price": "10.00",
 *     "imageUrl": "http://localhost:3000/assets/product1.jpg"
 *   },
 *   ...
 * ]
 */
app.get('/getProducts', (req, res) => {
  res.json(products);
});

/**
 * Route to register a new user.
 *
 * @param {Object} req - Express request object
 * @param {string} req.body.email - New user's email
 * @param {string} req.body.password - New user's password
 * @returns {Object} res - JSON response with a success or error message
 */
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

/**
 * Route to login a user.
 * 
 * @param {Object} req - Express request object
 * @param {string} req.body.email - User's email
 * @param {string} req.body.password - User's password
 * @returns {Object} res - JSON response with a success or error message
 */
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