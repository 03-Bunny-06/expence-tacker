const {z} = require("zod");

const { categories } = require("../models/transactionModel");

const transactionSchema = z.object({
    userId: z.string().min(4).max(10),
    title: z.string().min(10).max(150, "Title is too long!"),
    amount: z.number().positive(),
    category: z.enum(categories),
    date: z.coerce.date(),
    notes: z.optional()
})

module.exports = transactionSchema;