const router = require("express").Router();
const {CustomService } = require("../handlers");
const { Auth } = require("../middleware");

const handlers = new CustomService();
const auth = new Auth();

router.get("/:id",auth.authentication, handlers.getCustomService);
router.post("/",auth.authentication, handlers.createCustomService);

module.exports = router;