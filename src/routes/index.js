const router = require("express").Router();
const landingPage = require("./landingPage");

// Routes
router.use("/landingPage", landingPage);

module.exports = { router };
