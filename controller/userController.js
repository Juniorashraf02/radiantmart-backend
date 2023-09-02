const { generateToken } = require("../config/jsonwebtoken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDBId = require("../utils/validateMongoDB");



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
    const { id } = req.params;
    validateMongoDBId(id);

    try {
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        throw new Error(error);
    }
});


const deleteSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);

    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        throw new Error(error);
    }
});


const deleteAllUsersHandler = asyncHandler(async (req, res) => {
    try {
        const deletedUsers = await User.deleteMany({});
        res.status(200).json({
            msg: "all users are deleted"
        });
    } catch (error) {
        throw new Error(error);
    }
});

const updatedUser = asyncHandler(async (req, res) => {
    // console.log(req.user);
    const { _id } = req.user;
    validateMongoDBId(_id);

    try {
        const updateUser = await User.findByIdAndUpdate(
            _id,
            {
                firstName: req?.body?.firstName,
                lastName: req?.body?.lastName,
                email: req?.body?.email,
                mobile: req?.body?.mobile,
            },
            {
                new: true,
            });

        res.status(200).json(updateUser);
    } catch (error) {
        throw new Error(error);
    }
});



const blockAnUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);

    try {
        const block = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: true,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            msg: "user blocked"
        })
    } catch (error) {
        throw new Error(error);
    }
});
const unBlockAnUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDBId(id);

    try {
        const unblock = await User.findByIdAndUpdate(
            id,
            {
                isBlocked: false,
            },
            {
                new: true,
            }
        );
        res.status(200).json({
            msg: 'user unblocked'
        })
    } catch (error) {
        throw new Error(error);
    }
});




module.exports = {
    createUser, loginUser, getAllUser, getSingleUser, deleteSingleUser, deleteAllUsersHandler, updatedUser, blockAnUser,
    unBlockAnUser
};