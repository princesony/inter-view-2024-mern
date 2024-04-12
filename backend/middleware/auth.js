// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Users = require('../model/auth');
const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")

        if(!token) return res.status(400).json({msg: "Invalid Authentication."})

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded) return res.status(400).json({msg: "Invalid Authentication."})

        const user = await Users.findOne({_id: decoded.userId})
        
        req.user = user
        req.token = token
        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = auth;
