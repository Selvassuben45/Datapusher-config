const db = require('../config/db');


const createAccountMember = async (account_id, user_id, role_id, createdBy) => {
    try {
        const [account] = await db.query('SELECT * FROM account WHERE account_id = ?', [account_id]);
        if (account.length === 0) {
            throw new Error('Account does not exists');
        }
        const [user] = await db.query('SELECT * FROM user WHERE id = ?', [user_id]);
        if (user.length === 0) {
            throw new Error('User does not exist');
        }

        const [role] = await db.query('SELECT * FROM role WHERE id = ?', [role_id]);
        if (role.length === 0) {
            throw new Error('Role does not exist');
        }
        const [result] = await db.query(
            'INSERT INTO accountmember (account_id, user_id, role_id ,createdAt,createdBy) VALUES (?, ?, ?,NOW(),?) ',
            [account_id, user_id, role_id, createdBy]
        );
        return {
            id: result.insertId, account_id, user_id, role_id, createdBy
        };
    } catch (error) {
        console.error("Service Error:", error.message);

        throw new Error('Error creating account member');
    }
}

const getaccountmember = async () => {
    const [result] = await db.query('select * from accountmember');
    return result;
}



const updateaccountmember = async (id, updatedData) => {
    const { account_id, role_id, user_id, updatedBy } = updatedData;

    try {
        const [rows] = await db.query('SELECT id FROM accountmember WHERE id = ?', [id]);

        if (rows.length === 0) {
            throw new Error('Account Member Not Found');
        }

        const [result] = await db.query(
            'UPDATE accountmember SET account_id = ?, role_id = ?, user_id = ?, updatedAt = NOW(), updatedBy = ? WHERE id = ?',
            [account_id, role_id, user_id, updatedBy, id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Account Member Not Found');
        }

        return { id, ...updatedData };
    } catch (error) {
        console.error("Service Error:", error.message);
        throw new Error('Error updating account member');
    }
};
const getaccountmemberById = async (id) => {
    const [result] = await db.query('SELECT * FROM accountmember WHERE id = ?', [id]);
    if (result.length === 0) {
        throw new Error('Account Member Not Found');
    }
    return result;
}

const deleteaccountmember = async (id) => {
    const [result] = await db.query('DELETE FROM accountmember WHERE id = ?', [id]);
    return result;
}

module.exports = { createAccountMember, getaccountmember, updateaccountmember, getaccountmemberById, deleteaccountmember }