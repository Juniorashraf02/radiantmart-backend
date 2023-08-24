const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUser, getSingleUser, deleteSingleUser, deleteAllUsersHandler } = require('../controller/userController');

router.post('/register', createUser);
router.post('/login', loginUser);
router.get('/get-all-user', getAllUser);
router.get('/get-a-user/:id', getSingleUser);
router.delete('/delete-a-user/:id', deleteSingleUser);
router.delete('/delete-all-user', deleteAllUsersHandler);

module.exports = router;