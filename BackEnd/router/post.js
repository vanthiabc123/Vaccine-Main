const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const fileUpload = require("../middleware/cloudinary");

router.get("/", postController.getPost);
router.get("/:id", postController.getPostById);
router.post("/add", fileUpload.single("image"), postController.addPost);
router.put("/update/:id",fileUpload.single("image"), postController.updatePost);
router.delete("/delete/:id", postController.deletePost);

module.exports = router;
