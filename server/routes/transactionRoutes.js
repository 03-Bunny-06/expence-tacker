const {Router} = require("express");
const userMiddleware = require("../middlewares/userAuthMiddleware.js");
const { createNewTransaction, editExistingTransaction } = require("../contollers/transactionController");
const router = Router();

router.post('/create', userMiddleware, createNewTransaction);

router.put('/edit/:id', userMiddleware, editExistingTransaction);

module.exports = router;