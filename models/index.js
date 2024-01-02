const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB_CONNECTION = process.env.MONGO_DB_CONNECTION_URL;

module.exports.connectToDB = ()=>{
    mongoose.connect(MONGO_DB_CONNECTION);
    mongoose.connection.on("connected", ()=> console.log("Connected to DB successfully"));
    mongoose.connection.on("error", (err)=> console.log(err));
};