const router = require("express").Router();
const { Mail } = require("../handlers");

const handlers = new Mail();

router.post("/contact", handlers.addMail);
router.post("/apply", handlers.apply);

module.exports = router;
