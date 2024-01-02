const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4200;
const {connectToDB} = require("./models/index");
const authRouter = require("./routes/authRouter");
const chessOpeningRouter = require("./routes/chessOpeningsRouter");

connectToDB();
app.use(express.json());

app.get("/api", (req,res)=>{
    res.status(200).json({
        message : "Welcome Home"
    });
});


app.use(authRouter);
app.use(chessOpeningRouter);


app.get("*", (req,res)=>{
    res.status(400).json({
        message : "Resource not found"
    });
});

app.listen(PORT, ()=> console.log(`Server is now running at ${PORT}`));