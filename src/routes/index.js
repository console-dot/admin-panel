const router = require("express").Router();
const user = require("./User");
const login = require('./Login')
const landingPage = require("./landingPage");
const intro = require('./Intro');
const about = require('./About');
const offshoreType = require('./OffshoreType');
const testimonials = require('./Testimonials');
const expertise = require('./Expertise');
const offshoringService = require('./OffshoringServices');
const customService = require('./CustomService');
const productRS = require('./ProductRS');
const techStack = require('./TechStack');
const webDev = require('./WebDev');
const mobDev = require('./MobDev');
const blockchainDev = require('./BlockchainDev');
const aiService = require('./AIService');
const arvrService = require('./ArVrService');
const uiuxService = require('./UiUxService');
const faq = require('./Faq');
const openPosition = require("./OpenPostion");



router.use("/signup",  user);
router.use("/login", login);
router.use("/landingPage", landingPage);
router.use("/intro", intro);
router.use("/about", about);
router.use("/offShoreType", offshoreType);
router.use("/testimonials", testimonials);
router.use("/expertise", expertise);
router.use("/offshoringService", offshoringService);
router.use("/customService", customService);
router.use("/productRS", productRS);
router.use("/techStack", techStack);
router.use("/web-dev", webDev);
router.use("/mob-dev", mobDev);
router.use("/blockchain-dev", blockchainDev);
router.use("/artificail-intelligence", aiService);
router.use("/ar-vr", arvrService);
router.use("/ui-ux", uiuxService);
router.use("/faq", faq);
router.use("/open-positions", openPosition)


module.exports = router;
