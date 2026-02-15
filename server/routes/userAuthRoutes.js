const {Router} = require("express");
const registerNewUser = require("../contollers/userAuthController");
const router = Router();

router.post('/register', registerNewUser);

//router.post('/login');

module.exports = router;