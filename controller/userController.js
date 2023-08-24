const { generateToken } = require("../config/jsonwebtoken");
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

const loginUser = asyncHandler(async (req, res,) => {
    const { email, password } = req.body;
    // console.log(email,password);
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.isPasswordMatched(password)) {
        res.status(200).json({
            _id: findUser?._id,
            email: findUser?.email,
            firstName: findUser?.firstName,
            lastName: findUser?.lastName,
            mobile: findUser?.mobile,
            token: generateToken(findUser?._id),
        });
    } else {
        throw new Error("Invalid Credentials!")
    }
});


const getAllUser = asyncHandler(async (req, res) => {
    try {
        const allUser = await User.find({});
        res.status(200).json(allUser);
    } catch (error) {
        throw new Error("Error getting all users!");
    }
});

const getSingleUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        throw new Error(error);
    }
});
const deleteSingleUser = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        throw new Error(error);
    }
});
const deleteAllUsersHandler = asyncHandler(async (req, res) => {
    try {
        const deletedUsers = await User.find({});
        res.status(200).json(deletedUsers);
    } catch (error) {
        throw new Error(error);
    }
});




module.exports = { createUser, loginUser, getAllUser, getSingleUser, deleteSingleUser, deleteAllUsersHandler };