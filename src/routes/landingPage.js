const router = require("express").Router();
const { LandingPages } = require("../handlers");
const { Auth } = require("../middleware");

const handlers = new LandingPages();
const auth = new Auth();

router.get("/:id",auth.authentication, handlers.getLandingPage);
router.post("/",auth.authentication, handlers.addLandingPage);
router.put("/:id",auth.authentication, handlers.updateLandingPage);

module.exports = router;
