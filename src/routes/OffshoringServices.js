const router = require("express").Router();
const { OffshoringServices } = require("../handlers");
const { Auth } = require("../middleware");

const handlers = new OffshoringServices();
const auth = new Auth();

router.get("/:id",auth.authentication, handlers.getOffshoringServices);
router.post("/",auth.authentication, handlers.createOffshoringServices);
router.put("/:id",auth.authentication, handlers.updateOffshoringServices);

module.exports = router;
