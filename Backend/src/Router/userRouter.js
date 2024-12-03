const express = require("express");
const route=express.Router();


const {userRegister ,userLogin,getAllUser,logout}=require("../Controller/userController")
const {authenticateuser}= require("../Middleware/userauth")

route.post("/register",userRegister);
route.post("/login",userLogin);
route.post("/logout",authenticateuser,logout);
route.get("/getall",authenticateuser,getAllUser)




module.exports=route;