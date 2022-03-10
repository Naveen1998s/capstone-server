const express = require('express');
const UserRouter = express.Router();

const UserController=require('../controller/samples')
const userController = require('../controller/users')
const auth=require('../middleware/auth')

//Registration
UserRouter.post('/register',userController.register)

//Login
UserRouter.post('/login',userController.login)

//fetch data (get)
UserRouter.get('/users', userController.getAllSamples);

// UserRouter.get('/getUser/:_id',UserController.getUser)
UserRouter.get('/getUser/:_id',auth.authorizeAdmin,userController.getUser)
UserRouter.put('/getUser',userController.getUsers)
UserRouter.post("/getUser",userController.getUsers)

UserRouter.post('/postdetails',UserController.addSample)
UserRouter.get('/editdetails',UserController.getAllsampless)


module.exports =UserRouter