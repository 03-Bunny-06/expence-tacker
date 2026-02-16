const {Router} = require("express");
const userMiddleware = require("../middlewares/userAuthMiddleware.js");
const { createNewTransaction, editExistingTransaction, deleteTransaction, getAllTransactions, getTransactionAnalytics } = require("../contollers/transactionController");
const router = Router();

router.post('/create', userMiddleware, createNewTransaction);

router.put('/edit/:id', userMiddleware, editExistingTransaction);

router.delete('/delete/:id', userMiddleware, deleteTransaction);

router.get('', userMiddleware, getAllTransactions);

router.get('/analytics', userMiddleware, getTransactionAnalytics);

module.exports = router;