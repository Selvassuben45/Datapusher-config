const db = require('../config/db');
const path = require('path');
const { Worker } = require('worker_threads');

const createdata = async (token, eventId, receivedData) => {
    try {
        const [account] = await db.query('SELECT * FROM account WHERE app_secret_token = ?', [token]);
        if (!account || account.length === 0) {
            return { success: false, status: 401, message: 'Invalid account token' };
        }
        const account_id = account[0].account_id;
        console.log(account_id);

        const [destination] = await db.query('SELECT * FROM destination WHERE account_id = ?', [account_id]);
        if (!destination || destination.length === 0) {
            return { success: false, status: 404, message: 'No destination found' };
        }
        const destination_id = destination[0].id;
        console.log("destid@data", destination_id);

        await db.query(
            `INSERT INTO logs (event_id, account_id, received_timestamp, processed_timestamp, destination_id, received_data, status)
       VALUES (?, ?, NOW(),NOW(), ?, ?, ?)`,
            [eventId, account_id, destination_id, JSON.stringify(receivedData), 'received']
        );

        const worker = new Worker(path.resolve(__dirname, '../workers/dataProcessor.js'));
        worker.postMessage({
            event_id: eventId,
            account_id,
            destination_id,
            received_data: receivedData,
        });

        worker.on('message', (msg) => {
            console.log("Worker finished:", msg);
            worker.terminate();
        });

        return { success: true };

    } catch (err) {
        console.error("Service error:", err);
        return { success: false, status: 500, message: 'Internal Service Error' };
    }
}
module.exports = { createdata };