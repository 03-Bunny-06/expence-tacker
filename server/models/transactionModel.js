const mongoose = require("mongoose");

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
        enum: ["Food", "Transport", "Rent", "Utilities", "Entertainment", "Shopping", "Income", "Miscellaneous","Other"],
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

module.exports = Transaction;