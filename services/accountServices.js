const db = require('../config/db');
const crypto = require("crypto");

function generateAppSecretToken() {
    return crypto.randomBytes(32).toString("hex");
}

const createAccount = async ({ account_id, account_name, website, createdAt , userId }) => {
    const app_secret_token = generateAppSecretToken();
    console.log(app_secret_token);

    const [result] = await db.query(
        'INSERT INTO account (account_id, account_name,app_secret_token, website, createdAt, CreatedBy) VALUES (?, ?, ?, ?, NOW(),?)',
        [account_id, account_name, app_secret_token, website, userId]
    );
    return { id: result.insertId, account_id, account_name, app_secret_token, website, createdAt, CreatedBy: userId };
}

const getAccounts = async () => {
    const [rows] = await db.query('select * from account');
    return rows;
}
const getAccountById = async (accountId) => {
    const [rows] = await db.query('SELECT * FROM account WHERE id = ?', [accountId]);
    return rows[0];
}
const updateAccount = async (accountId, updateData ,userId) => {
    const { account_name, website } = updateData;
    const [existing] = await db.query(
        'SELECT id FROM account WHERE id = ?',
        [accountId]
    );

    if (existing.length === 0) {
        return { success: false, message: 'Account not found' };
    }

    const [result] = await db.query(
        'UPDATE account SET account_name = ?, website = ?, updatedat = NOW(), UpdatedBy = ? WHERE id = ?',
        [account_name, website, userId, accountId]
    );
    return result;
}

const deleteAccount = async (accountid) => {
    console.log("Acc", accountid);
    await db.query('DELETE FROM destination WHERE account_id=?', [accountid]);

    const [result] = await db.query('delete  from account where id=?', accountid)
    return result;
}

const getAccountsearch = async (filters) => {
    let query = "Select * from account where 1=1"
    let params = [];

    if (filters.name) {
        query += ` AND account_name LIKE '%${filters.name}%'`;
        params.push(`%${filters.name}%`);
    }

    const [result] = await db.query(query, params);
    return result;
}
module.exports = { createAccount, getAccounts, getAccountById, updateAccount, deleteAccount, getAccountsearch }