const roleServices = require('../services/roleServices');
const getRoles = async (req, res) => {
    try {
        const roles = await roleServices.getRoles();

        if (!roles || roles.length === 0) {
            return res.status(404).json({ success: false, message: "No roles found" });
        }
        return res.status(200).json({
            success: true,
            message: "Roles retrieved successfully",
            // roles: roles
        });
    } catch (error) {
        console.error("Error fetching roles:", error);
        return res.status(500).json({ success: false, message: "An error occurred while fetching roles", error: error.message });
    }
}

module.exports = { getRoles }