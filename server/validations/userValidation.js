const {z} = require("zod");

const registerSchema = z.object({
    userId: z.string().min(4).max(10),
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password is too short!")
})

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(8, "Password is too short!")
})

module.exports = {registerSchema, loginSchema};