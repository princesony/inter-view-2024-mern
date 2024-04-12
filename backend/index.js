// server.js
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./db/config');
require('dotenv').config();
const authRoutes = require('./router/authRoute');
const product = require('./router/productRoute')
const cart = require('./router/cartRouter')
// Create Express app
const app = express();

// Middleware  
app.use(cors()); 
app.use(express.json());  
app.use(cookieParser());

// Connect to MongoDB
connectDB();
// Test API endpoint - GET request
app.get('/api/test', (req, res) => {
    res.json({ message: 'This is a test API endpoint' });
});
app.use('/auth/v1', authRoutes);
app.use('/product/v1', product);
app.use('/cart/v1', cart);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
 