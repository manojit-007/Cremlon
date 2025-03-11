import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";
import Loader from "@/lib/Loader.jsx";
import { Trash, Upload } from "lucide-react";
import apiClient from "@/ApiClient/ApiClient";
import { toast } from "sonner";

const AddPost = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const fileRef = useRef(null);
  const [imageUpload, setImageUpload] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
    image: { public_id: "", url: "" },
  });

  // Load form data from local storage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("addPostForm");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);
      setPreview(parsedData.image.url || null);
    }
  }, []);

  // Save form data to local storage
  useEffect(() => {
    localStorage.setItem("addPostForm", JSON.stringify(formData));
  }, [formData]);

  const resetForm = () => {
    setFormData({
      name: "",
      comment: "",
      image: { public_id: "", url: "" },
    });
    setPreview(null);
    setImageUpload(null);
    fileRef.current && (fileRef.current.value = null);
    localStorage.removeItem("addPostForm");
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.onload = () => setPreview(fileReader.result);
    fileReader.readAsDataURL(file);
    setImageUpload(file);
  };

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
        "/post/uploadImage",
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
      setPreview(response.data.url);
    } catch (error) {
      console.error(error);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async () => {
    if (!formData.image.public_id) {
      toast.error("No uploaded image to delete.");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post(
        "/post/deleteImage",
        { image: formData.image },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Image deleted successfully.");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image.url) {
      toast.error("Please upload an image before submitting.");
      return;
    }

    try {
      setLoading(true);
      await apiClient.post(
        "/post/new",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Post added successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center p-4 bg-gray-50">
      {loading && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <Loader />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 w-full max-w-md rounded shadow-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Add New Post</h2>

        <Label htmlFor="name">Post Title</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter post title"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <Label htmlFor="comment">Comment</Label>
        <Textarea
          id="comment"
          name="comment"
          placeholder="Enter comment"
          value={formData.comment}
          onChange={handleInputChange}
          required
        />

        <Label htmlFor="image">Post Image</Label>
        <div className="flex flex-col gap-2">
          {!formData.image.url && !preview && (
            <Input
              id="image"
              type="file"
              accept="image/*"
              ref={fileRef}
              onChange={handleImageSelect}
            />
          )}
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover border rounded"
            />
          )}
          {preview && !formData.image.url && (
            <Button
              type="button"
              onClick={handleUploadedImage}
              className="bg-blue-500 text-white hover:bg-blue-600"
            >
              <Upload className="mr-1" /> Upload Image
            </Button>
          )}
        </div>

        {formData.image.url && (
          <div className="space-y-2">
            <img
              src={formData.image.url}
              alt="Uploaded"
              className="w-40 h-40 object-cover border rounded"
            />
            <Button
              type="button"
              onClick={deleteImage}
              className="bg-red-500 text-white hover:bg-red-600"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Image"}
            </Button>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-green-500 text-white hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Add Post"}
        </Button>
      </form>
    </section>
  );
};

export default AddPost;
