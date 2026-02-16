const env = require("dotenv");
env.config({path: "./.env"})

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const path = require("path");
const userAuthRouter = require("./routes/userAuthRoutes.js");
const transactionRouter = require("./routes/transactionRoutes.js");

const connectDb = require("./config/db.js");
connectDb();

//utf8 tells Node to read the file as text instead of raw binary
//Swagger expects a JavaScript object representation of the OpenAPI spec
const file = fs.readFileSync("openapi.yaml", "utf-8");
const swaggerDocument = YAML.parse(file);

//swaggerUi.serve serves the static Swagger UI frontend files (HTML, CSS, JS).
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());
app.use('/user', userAuthRouter);
app.use('/user/transactions', transactionRouter);

app.use((req, res) => {
  res.status(404).json({
    error: "Bad route (or) No route found"
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server started at: ${PORT} 🚀`);
})