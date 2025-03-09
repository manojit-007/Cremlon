import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import Loader from "@/lib/Loader.jsx";
import { Trash, Upload } from "lucide-react";
import apiClient from "@/ApiClient/ApiClient";
import { toast } from "sonner";

const AddService = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: { public_id: "", url: "" },
    description: "",
  });

  // Load form data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("addServiceForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      if (parsedData.image.url) {
        setPreview(parsedData.image.url);
      }
    }
  }, []);

  // Save form data to local storage
  useEffect(() => {
    localStorage.setItem("addServiceForm", JSON.stringify(formData));
  }, [formData]);

  // Reset form and states
  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      image: { public_id: "", url: "" },
      description: "",
    });
    setPreview(null);
    setImageUpload(null);
    if (fileRef.current) fileRef.current.value = null;
    localStorage.removeItem("addServiceForm");
  };

  // Handle image preview and selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => setPreview(fileReader.result);
    fileReader.readAsDataURL(file);
    setImageUpload(file);
  };

  // Handle image upload
  const handleUploadedImage = async () => {
    if (!imageUpload) {
      toast.error("Please select an image before uploading.");
      return;
    }

    try {
      setLoading(true);
      const imageFormData = new FormData();
      imageFormData.append("image", imageUpload);

      const response = await apiClient.post(
        "/service/uploadImage",
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Image uploaded successfully!");
      setFormData((prev) => ({
        ...prev,
        image: {
          public_id: response.data.public_id,
          url: response.data.url,
        },
      }));
    } catch (error) {
      console.log(error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image deletion
  const deleteImage = async () => {
    if (!formData.image.public_id) {
      toast.error("No uploaded image to delete.");
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.post(
        "/service/deleteImage",
        { image: formData.image },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Image deleted successfully.");
        resetForm(); // Reset form after deletion
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image.url) {
      toast.error("Please upload an image before submitting.");
      return;
    }
    try {
      setLoading(true);
      await apiClient.post(
        "/service/new",
        { ...formData },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Service added successfully!");
      resetForm();
    } catch (error) {
      console.log(error);
      toast.error("Failed to add service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-[100vh] flex flex-col items-center justify-center">
      {loading && (
        <div className="fixed inset-0 bg-gray-950 bg-opacity-90 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <h2 className="text-xl font-semibold mt-2">Add New Service</h2>
      <form
        onSubmit={handleSubmit}
        className="mt-6 flex flex-col gap-4 w-full max-w-lg p-6 border rounded shadow-md"
      >
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter service name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="text"
          placeholder="Enter service price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />

        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter service description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />

        <Label htmlFor="image">Upload Service Image</Label>
        <div className="flex flex-col gap-2">
          {preview && !formData.image.url ? (
            <img
              src={preview}
              alt="Preview"
              className="m-auto border-blue-500 w-40 h-40 object-cover border rounded"
            />
          ) : (
            <Input
              id="image"
              type="file"
              onChange={handleImageSelect}
              accept="image/*"
              ref={fileRef}
              className="block w-full border rounded"
            />
          )}
          {preview && (
            <div className="flex gap-2 w-full mt-2">
              <Button
                type="button"
                onClick={resetForm}
                className="bg-red-500 w-1/2 text-white rounded hover:bg-red-600 flex items-center justify-center"
              >
                <Trash className="mr-1" /> Remove
              </Button>
              <Button
                type="button"
                onClick={handleUploadedImage}
                className="bg-blue-500 w-1/2 text-white rounded hover:bg-blue-600 flex items-center justify-center"
              >
                <Upload className="mr-1" /> Upload
              </Button>
            </div>
          )}
        </div>

        {formData.image.url && (
          <div className="mt-4 flex flex-col gap-2">
            <img
              src={formData.image.url}
              alt="Service Image"
              className="w-40 h-40 object-cover border rounded"
            />
            <p>Image uploaded successfully.</p>
            <Button
              type="button"
              onClick={deleteImage}
              className="bg-red-500 w-full text-white rounded hover:bg-red-600 mt-2"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Image"}
            </Button>
          </div>
        )}

        <Button
          type="submit"
          className="bg-blue-500 text-white w-full rounded hover:bg-blue-600 mt-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Service"}
        </Button>
      </form>
    </section>
  );
};

export default AddService;
