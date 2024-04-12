// middleware/adminMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../model/auth');

const adminMiddleware = async (req, res, next) => {
    // Extract token from Authorization header
    const token = req.header('Authorization');

    // Check if token is present
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user ID from decoded token
        const userId = decoded.userId;

        // Find user by ID
        const user = await User.findById(userId);

        // Check if user is admin
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ msg: 'User is not authorized as admin' });
        }

        // Add user to request object for use in subsequent middleware/routes
        req.user = user;

        // Call next middleware
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = adminMiddleware;
