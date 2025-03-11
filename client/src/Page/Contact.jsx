import React, { useState } from "react";
import { Mail, MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/ApiClient/ApiClient";
import { toast } from "sonner";
import FaceBookIcon from "@/facebook.svg"
import InstagramIcon from "@/instagram.svg"
import WhatsAppIcon from "@/whatsapp.svg"
import YoutubeIcon from "@/youtube.svg"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send email to the server using formData
      await apiClient.post(`/sendMessage/mail`, formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" }); // Reset the form
    } catch (error) {
      toast.error(error.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
      <p className="text-gray-600 text-center mb-8 max-w-md">
        Have questions or want to connect? Reach out via social media or send us
        a message directly!
      </p>

      {/* Contact Information */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Contact Information
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <MessageCircle className="text-green-500 w-6 h-6" />
            <p className="text-gray-700 font-bold">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:underline"
              >
                +91 9876543210
              </a>
            </p>
          </div>
          {/* <div className="flex items-center space-x-4">
            <Mail className="text-blue-500 w-6 h-6" />
            <a
              href="mailto:email@example.com"
              className="text-gray-700 hover:text-blue-500 transition duration-300 font-bold"
            >
              email@example.com
            </a>
          </div> */}
        </div>
      </div>

      {/* Send a Message */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Send Us a Message
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name" className="text-gray-600">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-full mt-1"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-600">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              className="w-full mt-1"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-gray-600">
              Message
            </Label>
            <textarea
              id="message"
              name="message"
              rows="4"
              placeholder="Enter your message"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-6 mt-8">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition duration-300"
        >
          <img src={FaceBookIcon} className="w-6 h-6" alt="Facebook" />
        </a>
        <a
          href="https://www.instagram.com/cremlon_/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700 transition duration-300"
        >
          <img src={InstagramIcon} className="w-6 h-6" alt="Facebook" />
        </a>
        <a
          href="https://wa.me/7003262742 "
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-700 transition duration-300"
        >
          <img src={WhatsAppIcon} className="w-6 h-6" alt="Facebook" />
        </a>
        <a
          href="https://www.youtube.com/@cremlonart "
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-500 hover:text-green-700 transition duration-300"
        >
          <img src={YoutubeIcon} className="w-6 h-6" alt="Facebook" />
        </a>
      </div>
    </section>
  );
};

export default Contact;
