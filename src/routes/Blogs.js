const router = require("express").Router();
const { Blogs } = require("../handlers");
const { Auth } = require("../middleware");
const handlers = new Blogs();
const auth = new Auth();

// Public routes (no authentication required)
router.get("/", handlers.getAllBlogs);
router.get("/popular", handlers.getPopularBlogs);
router.get("/recent", handlers.getRecentBlogs);
router.get("/search", handlers.searchBlogs);
router.get("/slug/:slug", handlers.getBlogBySlug);
router.get("/:id", handlers.getBlog);

// Protected routes (authentication required)
router.post("/", handlers.createBlog);
router.put("/:id", handlers.updateBlog);
router.delete("/:id", handlers.deleteBlog);

module.exports = router;