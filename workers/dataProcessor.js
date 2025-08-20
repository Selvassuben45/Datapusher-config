const {parentPort} = require('worker_threads')
const db = require('../config/db');

parentPort.on('message', async (data) => {
    try{
        const {event_id,account_id,destination_id,received_data} =data;
await db.query(`insert into logs (event_id, account_id, destination_id, received_data,received_timestamp,processed_timestamp,status) values (?, ?, ?, ?,NOW(),NOW(),?)`, [event_id, account_id, destination_id, received_data,'success']);
        parentPort.postMessage({status: 'success', message: 'Data processed successfully'});
    }catch(Error){
        console.error('Error processing data:', Error.message);
        parentPort.postMessage({status: 'error', message: Error.message});
    }
})