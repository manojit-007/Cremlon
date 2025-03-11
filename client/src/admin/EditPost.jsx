import React, { useState, useEffect } from "react";
import apiClient from "@/ApiClient/ApiClient";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate= useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    image: {
      public_id: "",
      url: "",
    },
    comment: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(`/post/${id}`);
        setFormData(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch service data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  const deleteService = async () => {
    try {
      setLoading(true);
      await apiClient.delete(`/post/${id}`);
      toast.success("Service deleted successfully!");
      navigate(-1)
    } catch (error) {
      toast.error("Failed to delete service.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiClient.put(`/post/${id}`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Service updated successfully!");
      navigate(-1)
    } catch (error) {
      toast.error("Failed to update service.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md p-4 mx-auto">
      <h2 className="text-lg font-semibold mb-4">Edit Post</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Label htmlFor="name">Service Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter service name"
        />


        <Label htmlFor="description">Comment</Label>
        <Textarea
          id="description"
          name="comment"
          value={formData.comment}
          onChange={handleInputChange}
          placeholder="Enter comment"
        />

        <Label htmlFor="image">Image</Label>
        {formData.image.url ? (
          <img
            id="image"
            alt={formData.name || "Service image"}
            src={formData.image.url}
            className="w-full h-auto rounded"
          />
        ) : (
          <p className="text-gray-500">No image available</p>
        )}

        <Button type="submit" className="bg-blue-500 text-white rounded">
          {loading ? "Updating..." : "Update Service"}
        </Button>
      </form>
        <Button type="button" onClick={deleteService}>
            Delete
        </Button>
    </section>
  );
};

export default EditPost;
