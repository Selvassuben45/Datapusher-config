const jwt = require('jsonwebtoken');
const db = require('../config/db')
const authenticate = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(401).json({ message: 'No token provided' });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "Invalid Token" });

    }
}

const isAdmin = (req, res, next) => {
    if (!req.user || req.user.role_id !== 1) {
        return res.status(403).json({ message: "Access denied" });
    }
    next();
}
const loggedout = async(req,res,next)=>{
       try {
   const token = req.headers['authorization'];
   if (!token)
       return res.status(401).json({ message: 'No token provided' });

    const [rows] = await db.query('SELECT * FROM tokens WHERE token = ?', [token]);
        if (rows.length > 0) {
      return res.status(401).json({ success: false, message: "Token is blacklisted (logged out)" });
    }

       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded;
       next();
   } catch (err) {
       console.log(err);
       return res.status(403).json({ message: "Invalid Token" });

   }
}
module.exports = { authenticate, isAdmin ,loggedout};