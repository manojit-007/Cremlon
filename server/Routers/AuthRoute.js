const express = require('express')
const { registerUser, loginUser, isAdmin, forgotPassword, resetPassword, logOut } = require('../Controllers/AuthControllers')
const { verifyUser } = require('../Middleware/VerifyUser')
const AuthRoute = express.Router()

AuthRoute.post('/register',registerUser)
AuthRoute.post('/logIn',loginUser)
AuthRoute.post('/logOut',logOut)

AuthRoute.get('/me',verifyUser,isAdmin)
AuthRoute.post('/forgetPassword',forgotPassword)
AuthRoute.put("/password/reset/:resetToken",resetPassword);


module.exports = AuthRoute