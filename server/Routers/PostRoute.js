const express = require("express");
const { verifyUser } = require("../Middleware/VerifyUser");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const {
  uploadImage,
} = require("../Controllers/ServiceController");
const { createNewPost, getAllPosts, getPostById, updatePost, deletePost, deleteUploadedImage } = require("../Controllers/PostController");
const PostRoute = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./temp";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

PostRoute.post("/new", verifyUser, createNewPost);
PostRoute.get("/allPosts", getAllPosts);
PostRoute.put("/:id", verifyUser,updatePost);
PostRoute.delete("/:id", verifyUser,deletePost);
PostRoute.get("/:id", verifyUser,getPostById);
PostRoute.post("/deleteImage", verifyUser,deleteUploadedImage);

PostRoute.post(
  "/uploadImage",
  verifyUser,
  upload.single("image"),
  uploadImage
);

module.exports = PostRoute;
