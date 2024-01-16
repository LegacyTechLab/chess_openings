const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

module.exports.requireToken = function(req,res,next){
    const bearerHeader = req.headers["authorization"];
    try {
        let token = bearerHeader.split(" ")[1];
        jwt.verify(token, JWT_SECRET_KEY,(err, decodedToken)=>{
            if (err){
                res.status(401).json({
                    message : "Invalid token"
                }); 
            }else{
                next();
            }
        }); 
    } catch (err) {
        res.status(400).json({
            message : "Provide a valid token"
        }); 
    } 
};