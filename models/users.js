const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
        trim: true
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    created_at :{
        type : Date,
        default : Date.now()
    }
});


UserSchema.pre("save",async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});


UserSchema.statics.login = async function(email, password){
    let user = await this.findOne({email});
    let msg;
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if (auth){
            return user;
        }else{
            msg = "Password is incorrect";
            throw new Error(msg);
        }
    }else{
        msg = "Email does not exist";
        throw new Error(msg);
    }
};

module.exports = mongoose.model("user", UserSchema);