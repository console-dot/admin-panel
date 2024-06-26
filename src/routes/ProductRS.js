const router = require("express").Router();
const { ProductRS } = require("../handlers");
const { Auth } = require("../middleware");

const handlers = new ProductRS();
const auth = new Auth();

router.get("/",auth.authentication, handlers.getProductRS);
router.post("/",auth.authentication, handlers.addProductRS);
router.put("/:id",auth.authentication, handlers.updateProductRS);

module.exports = router;
