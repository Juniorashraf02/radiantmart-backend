const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUser, getSingleUser, deleteSingleUser, deleteAllUsersHandler, updatedUser, blockAnUser, unBlockAnUser } = require('../controller/userController');
const {authMiddleware, isAdmin} = require('../middlewares/authMiddleware');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/get-all-user', authMiddleware, isAdmin, getAllUser);
router.get('/get-a-user/:id', authMiddleware, getSingleUser);
router.delete('/delete-a-user/:id', deleteSingleUser);
router.delete('/delete-all-user', deleteAllUsersHandler);
router.put('/update-a-user',authMiddleware, updatedUser);
router.put('/block-an-user/:id', authMiddleware, isAdmin, blockAnUser);
router.put('/unblock-an-user/:id', authMiddleware, isAdmin, unBlockAnUser);


module.exports = router;