
const accountServices = require('../services/accountServices');
const { v4: uuidv4 } = require("uuid");

const createAccount = async (req, res) => {
    try {
        const userId = req.user.id;
        console.log(userId, "User ID");

        const { account_name, website, createdAt } = req.body;

        if (!account_name ) {
            return res.status(400).json({ sucess: false, message: "All the fields are required" })
        }
        const account_id = uuidv4();
        const newAccount = await accountServices.createAccount({ account_id, account_name, website, createdAt, userId});
        return res.status(200).json({
            sucess: true,
            message: "Account created successfully.",
            // account:newAccount
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "An error occurred while creating the account.",
            error: error.message
        });

    }
}


const getaccounts = async (req, res) => {
    try {
        const accounts = await accountServices.getAccounts();
        if (!accounts || accounts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No accounts found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Accounts retrieved successfully",
            // accounts:accounts
        })
    } catch (Error) {
        console.log(Error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

const getaccountsbyid = async (req, res) => {
    try {
        const accountId = req.params.id;
        console.log("Account ID:", accountId);

        const account = await accountServices.getAccountById(accountId);
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Account retrieved successfully",
            // account:account
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the account.",
            error: error.message
        });
    }
}

const updateAccount = async (req, res) => {
    try {
        const { account_id, account_name, website } = req.body;
        const accountId = req.params.id;
        console.log("Updating account with ID:", accountId);
        const userId = req.user.id;

        if (!account_id || !account_name ) {
            return res.status(400).json({ success: false, message: "All the fields are required" })

        }
        console.log(req.body);

        const updatedaccount = await accountServices.updateAccount(accountId, req.body,userId);
        if (!updatedaccount || updatedaccount.success === false) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Account updated successfully",
            // account:req.body
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while updating the account.",
            error: error.message
        });
    }
}


const deleteAccount = async (req, res) => {
    const accountid = req.params.id;
    try {
        const deletedaccount = await accountServices.deleteAccount(req.params.id);
        console.log(accountid);
        console.log(

            "De", deletedaccount);

        if (deletedaccount.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Account not found"
            });
        }
        return res.status(200).json({
            success: true, message: "Account Deleted Successfuly"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the account.",
            error: error.message
        })

    }
}

const accounts = async (req, res) => {
    try {
        const filters = req.query;
        const response = await accountServices.getAccountsearch(filters);
        return res.status(200).json({
            success: true,
            message: "Accounts retrieved successfully",
            // accounts:response
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while retrieving accounts.",
            error: error.message
        })
    }
}
module.exports = { createAccount, getaccounts, getaccountsbyid, updateAccount, deleteAccount, accounts }