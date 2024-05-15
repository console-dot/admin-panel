const router = require("express").Router();
const { TechStack } = require("../handlers");
const { Auth } = require("../middleware");
const handlers = new TechStack();
const auth = new Auth();

router.post("/", auth.authentication, handlers.createTechStack);
router.put("/:id", auth.authentication, handlers.updateTechStack);
router.delete("/:id", auth.authentication, handlers.deleteTechStack);
module.exports = router;
