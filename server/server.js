const env = require("dotenv");
env.config({path: "./.env"})

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const userAuthRouter = require("./routes/userAuthRoutes.js");
const transactionRouter = require("./routes/transactionRoutes.js");

const connectDb = require("./config/db.js");
connectDb();

app.use(bodyParser.json());
app.use('/user', userAuthRouter);
//app.use('/user/transactions', transactionRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started at: ${PORT} 🚀`);
})