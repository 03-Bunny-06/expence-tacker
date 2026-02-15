const {Router} = require("express");
const userMiddleware = require("../middlewares/userAuthMiddleware.js");
const { createNewTransaction, editExistingTransaction, deleteTransaction } = require("../contollers/transactionController");
const router = Router();

router.post('/create', userMiddleware, createNewTransaction);

router.put('/edit/:id', userMiddleware, editExistingTransaction);

router.delete('/delete/:id', userMiddleware, deleteTransaction);

module.exports = router;