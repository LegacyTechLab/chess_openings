const chessOpeningModel = require("../models/chessOpenings");


module.exports.getOpenings = async (req,res)=>{
    try {
        const allOpenings = await chessOpeningModel.find({});
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
    const body = req.body;
    try {
       let newOpening = await new chessOpeningModel({
            name : body.name,
            type : body.type,
            moves :body.moves,
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
    book.updatedAt = new Date();
    try {
        let opening = await chessOpeningModel.findById(id);
        if (!opening){
            res.status(400).json({
                message : "ID does not exist"
            });
        }
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