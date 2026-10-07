const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    changePassword,
} = require("../controllers/userController");

const router = express.Router();

// ================= GET PROFILE =================

router.get(
    "/profile",
    protect,
    getProfile
);

// ================= UPDATE PROFILE =================

router.put(
    "/profile",
    protect,
    updateProfile
);

// ================= CHANGE PASSWORD =================

router.put(
    "/change-password",
    protect,
    changePassword
);

module.exports = router;