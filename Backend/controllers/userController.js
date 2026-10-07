const User = require("../models/User");
const bcrypt = require("bcryptjs");

// ================= GET PROFILE =================

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(
            req.user._id
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json({
            user,
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// ================= UPDATE PROFILE =================

const updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message:
                    "Name and email are required",
            });
        }

        // Check if email is already used
        const existingUser = await User.findOne({
            email,
            _id: { $ne: req.user._id },
        });

        if (existingUser) {
            return res.status(400).json({
                message:
                    "Email is already in use",
            });
        }

        const user = await User.findById(
            req.user._id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        user.name = name;
        user.email = email;

        const updatedUser = await user.save();

        res.status(200).json({
            message:
                "Profile updated successfully",

            user: {
                id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// ================= CHANGE PASSWORD =================

const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword,
        } = req.body;

        // Check required fields
        if (
            !currentPassword ||
            !newPassword
        ) {
            return res.status(400).json({
                message:
                    "Current password and new password are required",
            });
        }

        // Check password length
        if (newPassword.length < 6) {
            return res.status(400).json({
                message:
                    "New password must be at least 6 characters",
            });
        }

        // Find logged-in user
        const user = await User.findById(
            req.user._id
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check current password
        const isPasswordCorrect =
            await bcrypt.compare(
                currentPassword,
                user.password
            );

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message:
                    "Current password is incorrect",
            });
        }

        // Hash new password
        const hashedPassword =
            await bcrypt.hash(
                newPassword,
                10
            );

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message:
                "Password changed successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

// ================= EXPORT =================

module.exports = {
    getProfile,
    updateProfile,
    changePassword,
};