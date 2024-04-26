const router = require("express").Router();
const user = require("./User");
const login = require('./Login')
const landingPage = require("./landingPage");

router.use("/signup",  user);
router.use("/login", login);
router.use("/landingPage", landingPage);
module.exports = router;
