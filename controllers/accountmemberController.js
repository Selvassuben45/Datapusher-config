const { get } = require('../app');
const accountmemberservices = require('../services/accountmemberServices');

const createaccountmember = async (req, res) => {
    try {
        const { account_id, user_id, role_id, createdBy } = req.body;

        const accountmember = await accountmemberservices.createAccountMember(account_id, user_id, role_id, createdBy);
        if (!account_id || !user_id || !role_id) {
            return res.status(400).json({
                success: false,
                message: 'Missing Required Fields',
                error: error.message
            })
        }
        return res.status(200).json({
            success: true,
            message: "Account Member Created Successfully",
            // data: accountmember
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message

        })

    }
}

const getaccountmember = async (req, res) => {
    try {
        const result = await accountmemberservices.getaccountmember();
        if (!result.length) {
            return res.status(404).json({
                success: false,
                message: 'No Account Members Found'
            });
        }
        return res.status(200).json({
            success: true,
            message: "Account Members Retrieved Successfully",
            // data: result
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })

    }
}

const getaccountmemberById = async (req, res) => {
    try {
        const accid = req.params.id;

        const response = await accountmemberservices.getaccountmemberById(accid);
        if (response.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Account Member Not Found'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Account Member Retrieved Successfully',
            // data: response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })

    }
}

const updateaccountmember = async (req, res) => {
    const updateid = req.params.id;
    try {
        const { account_id, user_id, role_id, updatedBy } = req.body;
        const accountmember = await accountmemberservices.updateaccountmember(updateid, { account_id, user_id, role_id, updatedBy });
        if (!accountmember) {
            return res.status(404).json({
                success: false,
                message: 'Account Member Not Found'
            });
        }
        return res.status(200).json({
            success: true,
            message: "Account Member Updated Successfully",
            // data: accountmember
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error.message
        })
    }

}
const deleteaccountmember = async (req, res) => {
    const id = req.params.id
    try {
        const response = await accountmemberservices.deleteaccountmember(id);
        if (response.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Account Member Not Found'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Account Member Deleted Successfully',
            // error:error.message
        })
    }
    catch (Error) {
        console.log(Error);
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: Error.message
        })

    }
}
module.exports = {
    createaccountmember, getaccountmember, getaccountmemberById, updateaccountmember, deleteaccountmember
}