const {Transaction} = require("../models/transactionModel.js");
const User = require("../models/userModel.js");
const transactionSchema = require("../validations/transactionValidation.js");

const createNewTransaction = async(req, res) => {
    try{
        const userId = req.body.userId;
        const title = req.body.title;
        const amount = req.body.amount;
        const category = req.body.category;
        const date = req.body.date;
        const notes = req.body.notes;

        const data = {
            userId,
            title,
            amount,
            category,
            date,
            notes
        }

        const validatedUserData = transactionSchema.parse(data);

        const userExists = await User.findOne({userId});

        if(userExists === null){
            return res.status(400).json({
                msg: "Invalid userID"
            })
        }

        const newTransaction = await Transaction.create(validatedUserData);
        return res.status(201).json({
            msg: "New transaction create successfully!",
            data: newTransaction
        })
    }
    catch(e){
        if (e.name === 'ZodError'){
            return res.status(400).json({
                error: e.message
            })
        }
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports = createNewTransaction;