const mongoose = require("mongoose");

const categories = ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Shopping", "Income", "Miscellaneous","Other"]
const transactionSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: categories,
        required: true,
        default: "Other"
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    notes: {
        type: String,
        trim: true,
        maxLength: 150
    }
})

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = {Transaction, categories};