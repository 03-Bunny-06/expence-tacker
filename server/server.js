const env = require("dotenv");
env.config({path: "./.env"})

const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const connectDb = require("./config/db.js");
connectDb();

app.use(bodyParser.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started at: ${PORT} 🚀`);
})