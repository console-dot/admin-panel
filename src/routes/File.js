const router = require("express").Router();
const { File } = require("../handlers");

const handlers = new File();

router.get("/:id", handlers.getFile);
router.post("/", handlers.upload);
router.post("/multiple", handlers.uploads);

module.exports = router;
