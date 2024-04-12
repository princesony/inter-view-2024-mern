// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/auth');

const registerUser = async (req, res) => {
    const { fullname, mobile, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullname,
            mobile,
            email,
            password: hashedPassword
        })
     

        // Save the user to the database
        await newUser.save();

        // Generate JWT token with expiration of 24 hours
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Exclude password field from user data
       
        // Set cookie with the token, expires in 24 hours
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 86400000, // 24 hours in milliseconds
        });
     
        // Respond with success message and user data
        res.status(201).json({ msg: 'User registered successfully', token,   user: {
            ...newUser._doc,
            password: ''
        }});
    } catch (error) {
        console.log('msg registering user:', error);
        res.status(500).json({ msg: error.message });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Generate JWT token with expiration of 24 hours
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Respond with success message and token
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 86400000, // 24 hours in milliseconds
        });
        res.status(200).json({ msg: 'Login successful', token,   user: {
            ...user._doc,
            password: ''
        }} );
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ msg: error.message });
    }
};
const refreshUserData = async (req, res) => {
    try {
        // Get the user ID from the authenticated user's information
        const userId = req.user;
        const token = req.token
        // Find the user by ID
        const user = await User.findById(userId);

        // If user is not found, return 404 status
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return user data
        res.json({ msg: 'User data refreshed successfully',token,   user: {
            ...user._doc,
            password: ''
        }});
    } catch (error) {
        console.error('Error refreshing user data:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    refreshUserData
};
