const db = require('../config/db');


const getRoles = async () => {
    const roles = await db.query('SELECT * FROM role');
    return roles;
}

module.exports = { getRoles };