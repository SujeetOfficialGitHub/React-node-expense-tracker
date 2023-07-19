const express = require('express')
const router = express.Router();

const userController = require('../controller/userController');


router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/password/forgot-password/', userController.forgotPassword)
router.post('/password/create-new-passowrd/', userController.createNewPassword)



module.exports = router