const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

// middleware
const { checkUserAuthentication } = require("../middlewares/checkUserAuth")

router.get("/", checkUserAuthentication, blogController.get_all_blogs);
router.get("/:id", checkUserAuthentication, blogController.get_blog_by_id);
router.post("/", checkUserAuthentication, blogController.post_create_new_blog);
router.put("/:id", checkUserAuthentication, blogController.update_blog);
router.delete("/:id", checkUserAuthentication, blogController.delete_blog);


module.exports = router;