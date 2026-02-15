const {Router} = require("express");
const userMiddleware = require("../middlewares/userAuthMiddleware.js");
const createNewTransaction = require("../contollers/transactionController");
const router = Router();

router.post('/create', userMiddleware, createNewTransaction);

module.exports = router;