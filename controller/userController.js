const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");



const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        // create new user
        const newUser = await User.create(req.body);
        res.status(200).json({
            success: true,
            newUser,
        });
    } else if (findUser) {
        throw new Error("User already exists!")
    }
});

module.exports = { createUser };