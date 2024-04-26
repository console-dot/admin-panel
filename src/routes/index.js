const router = require("express").Router();
const user = require("./User");
const login = require('./Login')
const landingPage = require("./landingPage");
const intro = require('./Intro');
const about = require('./About');
const offshoreType = require('./OffshoreType');
const testimonials = require('./Testimonials');
const expertise = require('./Expertise');

router.use("/signup",  user);
router.use("/login", login);
router.use("/landingPage", landingPage);
router.use("/intro", intro);
router.use("/about", about);
router.use("/offShoreType", offshoreType);
router.use("/testimonials", testimonials);
router.use("/expertise", expertise);


module.exports = router;
