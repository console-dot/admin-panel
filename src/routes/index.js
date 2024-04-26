const router = require("express").Router();
const {user} = require('./User');
const landingPage = require("./landingPage");

// Routes
router.use('/signup', user)
router.use("/landingPage", landingPage);

module.exports = { router };
