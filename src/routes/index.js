const router = require("express").Router();

const user = require("./User");
const login = require('./Login')

router.use("/signup",  user);
router.use("/login", login);
module.exports = router;
