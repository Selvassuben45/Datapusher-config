const dataservices = require('../services/dataServices');

const createdata = async (req, res) => {
    try {

        const token = req.headers['cl-x-token'];
        const event_id = req.headers['cl-x-event-id'];
        const received_data = req.body;
        if (!token || !event_id) {
            return res.status(400).json({
                success: false,
                message: "Missing required headers"
            });
        }
        const response = await dataservices.createdata(token, event_id, received_data);
        if (!response.success) {
            return res.status(400).json({
                success: false,
                message: response.message
            });
        }
        return res.status(200).json({
            success: true,
            message: "Data created successfully"
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })

    }

}

module.exports = { createdata }