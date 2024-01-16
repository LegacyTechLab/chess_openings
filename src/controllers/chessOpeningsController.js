const chessOpeningModel = require("../models/chessOpenings");


module.exports.getOpenings = async (req,res)=>{
    const page = req.query.page || 1;
    const limit = req.query.limit || 3;
    const skip = (page-1) * limit;
    try {
        const allOpenings = await chessOpeningModel.find({}).sort({name : 1}).skip(skip).limit(limit);
        res.status(200).json({
            message : "Successfully retreived all openings",
            data : allOpenings
        });
    } catch (err) {
       res.status(500).json({
            message : "Oops😪, An error occured",
            data : err.msg
       });
    }
};

module.exports.getOpening = async (req,res)=>{
    let id = req.params.id;
    try {
        const opening = await chessOpeningModel.findById(id);
        if(!opening){
            res.status(400).json({
                message : "ID does not exist"
            });
        }
        res.status(200).json({
            message : "Successfully retreived chess opening",
            data : opening
        });
    } catch (err) {
       res.status(500).json({
            message : "Oops😪, An error occured",
            data : err.msg
       });
    }
};

module.exports.createOpening = async (req,res)=>{
    const {name, type, moves} = req.body;
    try {
       let newOpening = await new chessOpeningModel({
            name,
            type,
            moves,
            updatedAt : new Date(),
            createdAt : new Date()
        }).save();
        res.status(201).json({
            message : "Chess opening created successfully",
            data : newOpening
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message : "Oops😪, An error occured",
            data : err
       });
    }
};

module.exports.updateOpening = async (req,res)=>{
    let id = req.params.id;
    let book = req.body;
    try {
        let opening = await chessOpeningModel.findById(id);
        if (!opening){
            res.status(400).json({
                message : "ID does not exist"
            });
        }
        book.updatedAt = new Date();
        let updatedOpening = await chessOpeningModel.findByIdAndUpdate(id, book, {new : true});
        res.status(200).json({
            message : "Opening Updated successfully",
            data : updatedOpening
        });
    } catch (err) {
        res.status(500).json({
            message : "Oops😪, An error occured",
            data : err.msg
       });
    }
};

module.exports.deleteOpening = async (req,res)=>{
        let id = req.params.id;
        try {
        let opening = await chessOpeningModel.findById(id);
        if (!opening){
            res.status(400).json({
                message : "ID does not exist"
            });
        }
       await chessOpeningModel.findByIdAndDelete(id);
        res.status(200).json({
            message : "Opening deleted successfully"
        });
    } catch (err) {
        res.status(500).json({
            message : "Oops😪, An error occured",
            data : err.msg
       });
    }
};