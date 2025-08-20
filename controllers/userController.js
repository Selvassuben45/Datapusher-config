const bcrypt = require('bcrypt');
const authServices = require('../services/authServices');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role_id: user.role_id,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );
};
const Login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    try {
        const { user, password } = req.body;

        const userData = await authServices.findUserByName(user);

        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, userData.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        const token = generateToken(userData);
        // console.log(token);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            userId: userData.id, token: token
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "An error occurred during login", error: error.message });
    }
};


module.exports = {
    Login
}