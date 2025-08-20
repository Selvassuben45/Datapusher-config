const Login = async (req, res) => {
    const { user, password } = req.body;
    try {
        const userData = await User.findOne({ where: user })
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (userData.password !== password) {
            return res.status(401).json({ success: false, message: "Invalid password" });

        }
        return res.status(200).json({
            success: true,
            message: "Login successful",
            userId: userData.id
        });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: "An error occurred during login", error: error.message });
    }
}

