const Joi = require("joi");

//check all errors
module.exports.validateUser = (req, res, next)=>{
    const schema = Joi.object({
        email : Joi.string().email().min(3).lowercase().required(),
        password : Joi.string().min(6).required()
    });

    const {error} = schema.validate(req.body);
    if (error){
        const message = error.details[0].message;
        res.status(400).json({
            message : "An error occured",
            error : message
        });
    }else{
        next();
    }
};

module.exports.validateOpenings = (req, res, next)=>{
    const schema = Joi.object({
        name : Joi.string().required(),
        type : Joi.string().required(),
        moves : Joi.string().required(),
    });

    const {error} = schema.validate(req.body);
    if (error){
        const message = error.details[0].message;
        res.status(400).json({
            message : "An error occured",
            error : message
        });
    }else{
        next();
    }
};