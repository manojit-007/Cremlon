const CatchAsyncError = require("../Middleware/CatchAsyncError");
const Service = require("../Models/ServiceModel");
const PATH = require("path");
const fs = require("fs");
const { cloudinary } = require("../Middleware/Cloudinary");

const uploadImage = CatchAsyncError(async (req, res, next) => {
  if (req.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }
    const { path: inputPath } = req.file;
    const uploaderResult = await cloudinary.uploader.upload(inputPath, {
      folder: "cremlon_image",
      format: "webp",
    });
    fs.unlink(inputPath, (err) => {
      if (err) console.error("Error deleting temporary file:", err.message);
    });
    res.status(200).json({
      message: "Image uploaded successfully.",
      url: uploaderResult.secure_url,
      public_id: uploaderResult.public_id,
    });
  } catch (err) {
    console.error("Error in uploadImage:", err.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

const createNewService = CatchAsyncError(async (req, res, next) => {
  const { name, price, image, description } = req.body;
  if (req.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  if (!name || !image || !description || !price) {
    return res.status(403).json({ message: "Fill from properly." });
  }

  const service = await Service.create({
    name,
    price,
    image,
    description,
  });

  res.status(201).json({
    success: true,
    message: "Service created successfully",
    data: service,
  });
});

const getAllServices = CatchAsyncError(async (req, res, next) => {
  const services = await Service.find({});
  res.json({ success: true, data: services });
});

const deleteUploadedImage = CatchAsyncError(async (req, res, next) => {
  const { image } = req.body;
  if (!image) {
    return res.status(400).json({ message: "No image provided." });
  }
  const { public_id } = image;
  const { url } = image;
  if (url.includes("https://res.cloudinary.com/")) {
    await cloudinary.uploader.destroy(public_id);
    console.log("Deleted image from cloudinary", public_id);
    res.status(200).json({ message: "Image deleted successfully." });
  }
});

const updateService = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (req.role !== "Admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  const { name, price, image, description } = req.body;
  if (!name || !image || !description || !price) {
    return res.status(403).json({ message: "Fill from properly." });
  }
  if (!id) {
    return res.status(400).json({ message: "Invalid service id" });
  }
  const updatedService = await Service.findByIdAndUpdate(
    id,
    { name, price, image, description },
    { new: true }
  );
  res.json({ success: true, data: updatedService });
});

const deleteService = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  // Validate ID
  if (!id) {
    return res.status(400).json({ message: "Invalid service ID" });
  }

  // Find the service by ID
  const service = await Service.findById(id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  // Delete the associated image from Cloudinary
  if (service.image && service.image.public_id) {
    try {
      await cloudinary.uploader.destroy(service.image.public_id);
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error);
      return res.status(500).json({
        message: "Failed to delete image from Cloudinary. Please try again.",
      });
    }
  }

  // Delete the service from the database
  await Service.findByIdAndDelete(id);

  res.status(200).json({ success: true, message: "Service deleted successfully" });
});


const getServiceById = CatchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Invalid service id" });
  }
  const service = await Service.findById(id);
  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }
  res.json({ success: true, data: service });
});

module.exports = {
  createNewService,
  getAllServices,
  updateService,
  deleteService,
  getServiceById,
  uploadImage,
  deleteUploadedImage
};
