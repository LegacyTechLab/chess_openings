const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4200;
const {connectToDB} = require("./src/models/index");
const router = require("./src/routes/index");


connectToDB();
app.use(express.json());

app.get("/api", (req,res)=>{
    res.status(200).json({
        message : "Welcome Home"
    });
});


app.use("/api", router);
app.get("*", (req,res)=>{
    res.status(400).json({
        message : "Resource not found"
    });
});

app.listen(PORT, ()=> console.log(`Server is now running at ${PORT}`));