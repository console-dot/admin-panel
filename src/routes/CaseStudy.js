const router = require("express").Router();
const { CaseStudies } = require("../handlers");
const { Auth } = require("../middleware");
const handlers = new CaseStudies();
const auth = new Auth();

router.get("/", auth.authentication, handlers.getAllCaseStudies);
router.get("/:id", auth.authentication, handlers.getCaseStudy);
router.post("/", auth.authentication, handlers.createCaseStudy);
module.exports = router;
