const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const userModel = require("../models/users");
const maxAge = "2 days";

const createToken = (email, id)=>{
    let token = jwt.sign({email, id},JWT_SECRET_KEY, {expiresIn : maxAge});
    return token;
};

module.exports.signUp = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email : email});
        if(user){
            throw new Error("Email already exists");
        }
        let newUser = await new userModel({
            email,
            password
        }).save();
        res.status(200).json({
            message: "User Created successfully",
            data : newUser
        });
    } catch (err) {
        res.status(500).json({
            message : "Oops😪, An error occured",
            data : err.msg
       });
    }
};

module.exports.login = async (req, res)=>{
   try {
    const {email, password} = req.body;
    const user = await userModel.login(email, password);
    if(user){ 
        let token = createToken(user.email, user._id);
        res.status(200).json({
            message : "User logged in successfully",
            token
        });
    }
   } catch (error) {
            res.status(400).json({
            message : "An error occured",
            data : error.message
        });
   }
};

