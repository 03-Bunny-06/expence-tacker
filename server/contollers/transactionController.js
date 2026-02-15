const {Transaction} = require("../models/transactionModel.js");
const User = require("../models/userModel.js");
const transactionSchema = require("../validations/transactionValidation.js");
const mongoose = require("mongoose");

const createNewTransaction = async(req, res) => {
    try{
        const {
            userId,
            title,
            amount,
            category,
            date,
            notes
        } = req.body;

        const data = {userId, title, amount, category, date, notes};

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

const editExistingTransaction = async(req, res) => {
    const id = req.params.id;
    const {title, amount ,category, date, notes} = req.body;
    const data = {title, amount, category, date, notes};

    const isValidTransactionId = mongoose.isValidObjectId(id);
    if(!isValidTransactionId){
        return res.status(404).json({
            msg: "Invalid transaction ID!"
        })
    }

    try{
        const transactionExists = await Transaction.findById(id);
        if(!transactionExists){
            return res.status(404).json({
                msg: "Transaction does not exist!"
            })
        }

        const updatedTransaction = await Transaction.findByIdAndUpdate(id, {
            $set: data
        }, {new: true, runValidators: true})

        res.status(200).json({
            msg: "Edited the transaction successfully!",
            editedTransaction: updatedTransaction
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

const deleteTransaction = async(req, res) => {
    const id = req.params.id;

    const isValidTransactionId = mongoose.isValidObjectId(id);

    if(!isValidTransactionId){
        return res.status(404).json({
            msg: "Invalid transaction ID!"
        })
    }
    try{
        const transactionExists = await Transaction.findById(id);
        if(!transactionExists){
            return res.status(404).json({
                msg: "Transaction does not exist!"
            })
        }

        const deletedTransaction = await Transaction.findByIdAndDelete(id);
        res.status(200).json({
            msg: "Transaction deleted successfully!"
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

module.exports = {createNewTransaction, editExistingTransaction, deleteTransaction};