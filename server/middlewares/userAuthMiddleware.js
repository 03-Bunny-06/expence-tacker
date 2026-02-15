const jwt = require("jsonwebtoken");

const userMiddleware = async(req, res, next) => {
    const token = req.headers.authorization;

    if(token === undefined || token.length === 0){
        return res.status(401).json({
            msg: "Authorization header missing!"
        })
    }

    const splitToken = token.split(" ");
    const isValidToken = splitToken[0] === "Bearer";
    if (!isValidToken){
        return res.status(401).json({
            msg: "Invalid authorization token!"
        })
    }

    const rawToken = splitToken[1];

    try{
        const JWT_SECRET_KEY = process.env.JWT_KEY;
        const payload = jwt.verify(rawToken, JWT_SECRET_KEY);

        const decodedEmail = payload.email;
        if(decodedEmail){
            next();
        }
        else{
            return res.status(400).json({
                msg: "Username not found in the token"
            })
        }
    }
    catch(e){
        res.status(500).json({
            error: e.message
        })
    }
}

module.exports = userMiddleware;