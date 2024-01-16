const mongoose = require("mongoose");

const chessOpeningSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    type : {
        type : String,
        required : true,
        lowercase : true
    },
    moves : {
        type : String,
        required : true 
    },
    updatedAt : {
        type : Date,
        required : true
    },
    createdAt : {
        type : Date,
        required : true
    },
});



module.exports = mongoose.model("opening", chessOpeningSchema);