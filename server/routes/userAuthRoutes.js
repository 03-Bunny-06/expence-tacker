const {Router} = require("express");
const {registerNewUser, loginExistingUser} = require("../contollers/userAuthController");
const router = Router();

router.post('/register', registerNewUser);

router.post('/login', loginExistingUser);

module.exports = router;