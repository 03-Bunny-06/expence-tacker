const jwt = require("jsonwebtoken");
const {registerSchema, loginSchema} = require("../validations/userValidation.js");
const User = require("../models/userModel.js");

const registerNewUser = async(req, res) => {
    try{
        const userId = req.headers.userid;
        const email = req.headers.email;
        const password = req.headers.password;

        const data = {
            userId,
            email,
            password
        }

        const validatedUserData = registerSchema.parse(data);

        const userAlreadyExists = await User.findOne({$or: [
            {userId: validatedUserData.userId},
            {email: validatedUserData.email}
        ]});

        console.log(userAlreadyExists);
        
        if(userAlreadyExists){
            return res.status(409).json({
                msg: 'User already exists, Try Login (or) use a different userId and email!'
            })
        }

        const newUser = await User.create(validatedUserData);

        return res.status(201).json({
            msg: "User created successfully!"
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

const loginExistingUser = async(req, res) => {
    try{
        const email = req.headers.email;
        const password = req.headers.password;

        const data = {
            email,
            password
        }

        const validatedUserData = loginSchema.parse(data);

        const userAlreadyExists = await User.findOne(validatedUserData);

        if (userAlreadyExists === null){
            return res.status(404).json({
                msg: "Invalid email (or) password!"
            })
        }
        else{
            const JWT_SECRET_KEY = process.env.JWT_KEY;
            const authenticationToken = jwt.sign({email}, JWT_SECRET_KEY);
            console.log(authenticationToken);

            return res.status(200).json({
                msg: "Signin Successful!",
                authenticationToken: authenticationToken
            })
        }
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

module.exports = {registerNewUser, loginExistingUser};