const router = require("express").Router();
const {CustomService } = require("../handlers");
const { Auth } = require("../middleware");

const handlers = new CustomService();
const auth = new Auth();

router.get("/",auth.authentication, handlers.getCustomService);
router.post("/",auth.authentication, handlers.createCustomService);
router.put("/:id",auth.authentication, handlers.updateCustomService);

module.exports = router;