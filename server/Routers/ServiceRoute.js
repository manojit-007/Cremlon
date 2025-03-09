const express = require("express");
const { verifyUser } = require("../Middleware/VerifyUser");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const {
  createNewService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,
  uploadImage,
  deleteUploadedImage,
} = require("../Controllers/ServiceController");
const ServiceRoute = express.Router();

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

ServiceRoute.post("/new", verifyUser, createNewService);
ServiceRoute.get("/allService", getAllServices);
ServiceRoute.put("/:id", verifyUser,updateService);
ServiceRoute.delete("/:id", verifyUser,deleteService);
ServiceRoute.get("/:id", verifyUser,getServiceById);
ServiceRoute.post("/deleteImage", verifyUser,deleteUploadedImage);

ServiceRoute.post(
  "/uploadImage",
  verifyUser,
  upload.single("image"),
  uploadImage
);

module.exports = ServiceRoute;
