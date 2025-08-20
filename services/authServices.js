const bcrypt = require('bcrypt');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const register = async (userBody) => {
    const { name, email, password, CreatedAt, CreatedBy } = userBody;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO user (User,email, password, CreatedAt, CreatedBy ) VALUES (?, ?,?, NOW(), ?)',
        [name, email, hashedPassword, CreatedAt, CreatedBy || null]
    );

    const userId = result.insertId;
    console.log("New userId:", userId);
    const role_id = (userId === 1) ? 1 : 2;
    await db.query(
        `UPDATE user SET role_id = ? WHERE id = ?`,
        [role_id, userId]
    );
    return { id: result.insertId, name, email, role_id, CreatedAt, hashedPassword };
}

const findUserByName = async (name) => {
    const [rows] = await db.query('SELECT * FROM user WHERE User = ?', [name]);
    return rows[0];
};


const logoutUser = async (token) => {
try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        return { success: false, message: "Invalid token" };
    }
const user_id = decoded.id;
 await db.query(
      "INSERT INTO tokens(token, user_id) VALUES (?, ?)",
      [token, user_id]
    );    return { success: true, message: "User logged out successfully" };
}catch(error){
    console.log(error);
   return { success: false, message: "Internal server error", error: error.message };
}

}
module.exports = { register, findUserByName ,logoutUser};