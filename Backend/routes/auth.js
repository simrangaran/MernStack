var express = require("express");
var router = express.Router();
const {signout,signup,signin} = require("../controllers/auth")
const {check,validationResult} = require('express-validator');

router.get("/signout" , signout);

router.post("/signup" , [
    check("name","name should be atleast 3 letters").isLength({min:3}),
    check("email","email is required").isEmail()
],signup);

router.post("/signin" , [
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min:5})
],signin);

module.exports=router;