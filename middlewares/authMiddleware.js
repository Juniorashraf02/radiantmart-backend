const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


const authMiddleware = asyncHandler(async (req, res, next) => {
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                console.log(decode);
                const user = await User.findById(decode?.id)
                req.user = user;
                next()
            }

        } catch (error) {
            throw new Error(error);
        }
    } else {
        throw new Error("no authorization in the header")
    }

   
});



const isAdmin = asyncHandler(async (req, res, next) => {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== 'admin') {
        throw new Error('you are not an admin')
    }
    next();
})


module.exports = { authMiddleware, isAdmin };