const User = require("../models/userModel");



const createUser = async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        // create new user
        const newUser = await User.create(req.body);
        res.status(200).json({
            success: true,
            newUser,
        });
    } else if(findUser) {
        res.status(400).json({
            success: false,
            message: "User already exists"
        })
    }
};

module.exports = { createUser };