const {registerSchema} = require("../validations/userValidation.js");
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

        res.status(201).json({
            msg: "User created successfully!"
        })
    }
    catch(e){
        if (e.name === 'ZodError'){
            res.status(400).json({
                error: e.message
            })
        }
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports = registerNewUser;