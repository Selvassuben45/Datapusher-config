// const
const destinationService = require('../services/destinationServices');
const jwt = require('jsonwebtoken');
const createdestination = async (req, res) => {
    const token = req.headers['authorization'];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
    console.log(decoded.id, "Decoded user ID");

    const userId = req.user.id;
        console.log(decoded, "Decoded user");
    try {
        const { account_id, url, http_methods, headers, createdAt } = req.body;
        const result = await destinationService.createDestinaiton({
            account_id, http_methods, url, headers, createdAt, userId
        }
        )
        console.log("Res", result);

        return res.status(200).json([{
            success: true,
            message: "Destination created successfully",
            // data:result

        }])
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Error creating destination",
            error: error.message
        })

    }
}


const getDestination = async (req, res) => {
    try {
        const destination = await destinationService.getDestinations();
        if (!destination || destination.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No destinations found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Destination fetched",
            // destinations:destination
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succes: false,
            message: "Error fetching Destination",
            error: error.message
        })

    }
}

const getDestinationbyid = async (req, res) => {
    const destinationId = req.params.id;

    console.log(destinationId, "desid");

    try {
        const destination = await destinationService.getDestinationById(destinationId);
        if (!destination || destination.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Destination fetched successfully",
            // destination:destination
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succes: false,
            message: "Internal server error",
            error: error.message
        })

    }
}

const updatedestination = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId, "User ID from token");

        const destinationId = req.params.id;
        const { account_id, url, http_methods, headers } = req.body;
        const result = await destinationService.updatedestination(destinationId, {
            account_id, http_methods, url, headers
        });
        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Destination updated successfully",
            // data:result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })

    }
}



const deletedestination = async (req, res) => {
    const destinationId = req.params.id;
    console.log(destinationId);

    try {

        const result = await destinationService.deletedestination(destinationId);
        console.log(result, "res");

        if (!result || result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Destination not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Destination deleted successfully",
            // data:result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })

    }
}

const getDestinationsearch = async (req, res) => {
    try {
        const filters = req.query;
        if(!filters || filters.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No filters provided"
            });
        }
        const response = await destinationService.getDestinationsearch(filters);
        return res.status(200).json({
            success: true,
            message: "Destinations retrieved successfully",
            // data:response
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
module.exports = {
    createdestination, getDestination, getDestinationbyid, updatedestination, deletedestination, getDestinationsearch
}