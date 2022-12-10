const User = require("../models/user");
const {check,validationResult} = require('express-validator');
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signout = (req,res) =>{
    res.json({
         message : 'Signed Out'
});
};


exports.signup = (req,res) =>  {
    const  errors = validationResult(req);
    const user = new User(req.body);
    if(!errors.isEmpty()){
        return res.status(422).json({
                error : errors.array()[0].msg
    });
    };
    user.save((err,user) => {
        if(err){
            return res.status(400).json({
                err : "Not able to Save"
            })
        }
        res.json({
            name : user.name,
            id : user._id
        });
    })
};


exports.signin = (req,res) =>  {
    const  errors = validationResult(req);
    const {email,password} = req.body;
    if(!errors.isEmpty()){
        return res.status(422).json({
                error : errors.array()[0].msg
    });
    };

    User.findOne({email} , (err,user)=>{
        if(err){
            res.status(400).json({
                 error : "User email doesnt exsist"
            })
        }
        if(!user.authenticate(password)){
            return res.status(401).json({
                error : "Email and Password don't match"
            })
        }
    

    const token = jwt.sign({_id:user._id},process.env.SECRET)
    res.cookie("token" , token , {expire : new Date()+9999});
    const {_id , name , email , role} = user;
    return res.json ({token , user : {_id , name , email , role}});

    });
};