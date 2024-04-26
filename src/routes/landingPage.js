const router = require("express").Router();
const { LandingPages } = require("../handlers");

const handlers = new LandingPages();

router.post("/", handlers.addLandingPage);

module.exports = router;
