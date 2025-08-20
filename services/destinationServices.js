const db = require('../config/db');


const createDestinaiton = async ({ account_id, url, http_methods, headers, createdAt, userId }) => {

    const [account] = await db.query('select * from account where account_id=? ', [account_id])
    console.log("Accd", account);

    if (!account || account.length === 0) {
        throw new Error('Account not found')
    }
    const accountPk = account[0].id
    const [result] = await db.query('insert into destination (account_id, accid,url, http_methods, headers, createdAt, createdBy) values (?,?, ?, ?, ?, NOW(), ?)', [account_id, accountPk,url, http_methods, headers,  userId])
    console.log(result, "rd");

    return [{ id: result.insertId, account_id,  url, http_methods,accid:accountPk, headers, createdAt, createdBy: userId }];

}


const getDestinations = async () => {
    const [result] = await db.query('select * from destination');
    return result;
}

const getDestinationById = async (id) => {
    const [result] = await db.query('select * from destination where id = ?', [id]);
    return result;
}
const updatedestination = async (destinationId, updatedData,userId) => {

    const { account_id, url, http_methods, headers } = updatedData;
    const [destid] = await db.query(`select id from destination where id = ?`, [destinationId]);

    if (!destid || destid.length === 0) {
        throw new Error('Destination not found');
    }

    // const [result] = await db.query(`update destination set ? updatedAt=NOW(),updatedBy=? where id = ?`, [updatedData, userId, destinationId]);
 const [result] = await db.query(
        `UPDATE destination
         SET account_id = ?, url = ?, http_methods = ?, headers = ?,
             updatedAt = NOW(), updatedBy = ?
         WHERE id = ?`,
        [account_id, url, http_methods, headers, userId, destinationId]
    );
    return result;
}
const deletedestination = async (destinationId) => {
    const [result] = await db.query(`delete from destination where id = ?`, [destinationId]);
    return result;
}


const getDestinationsearch = async (filters) => {
    let query = db.query('select * from destination where 1=1');
    const params = []

    if (filters.headers) {
        query += ` AND headers LIKE ?`;
        params.push(`%${filters.headers}%`);
    }

    const [result] = await db.query(query, params);
    return result;
}
module.exports = {
    createDestinaiton, getDestinations, getDestinationById, updatedestination, deletedestination, getDestinationsearch
}