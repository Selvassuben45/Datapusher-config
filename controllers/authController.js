const bcrypt = require('bcrypt');
const authServices = require('../services/authServices');
const { validationResult } = require('express-validator');

const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success: false, errors: 'All the fields are required' });
    }

    try {
        const newRegisteredUser = await authServices.register(req.body);

        return res.status(200).json({
            success: true,
            message: "User registered successfully.",
            userId: newRegisteredUser.insertId
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during registration.",
            error: error.message
        });
    }
};

const logoutUser = async(req,res)=>{

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({ success: false, message: "Token required" });
    }

    const result = await authServices.logoutUser(token);

    if (!result.success) {
      return res.status(401).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
    registerUser,
    logoutUser
}