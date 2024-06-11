const router = require("express").Router();
const { HeroDescription } = require("../handlers");
const { Auth } = require("../middleware");
const handlers = new HeroDescription();
const auth = new Auth();

router.get("/", auth.authentication, handlers.getHeroDescription);
router.put("/:id", auth.authentication, handlers.updateHeroDescription);

module.exports = router;
