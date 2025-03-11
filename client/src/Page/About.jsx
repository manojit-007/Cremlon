import React from "react";
import Logo from "@/logo.jpg";
import FaceBookIcon from "@/facebook.svg";
import InstagramIcon from "@/instagram.svg";
import WhatsAppIcon from "@/whatsapp.svg";
import YoutubeIcon from "@/youtube.svg";

const About = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 bg-gradient-to-br from-blue-50 via-white to-gray-100">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-tr from-blue-50 to-indigo-200 flex items-center justify-center">
          <img
            className="w-48 h-48 md:w-64 md:h-64 rounded-full shadow-lg border-4 border-white object-cover"
            src={Logo}
            alt="Profile"
          />
        </div>

        {/* Text Section */}
        <div className="p-8 md:p-12 w-full md:w-1/2">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            About Me
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Hello friends! Welcome to my website. I am a commissioned portrait
            artist, and I specialize in creating beautiful portraits. Whether
            it's a single portrait or a group of people captured in a single
            frame, I bring your vision to life with my artwork.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            If you want to place an order, contact me through social media. I
            can deliver your order anywhere in India. You can order any custom
            frame size for your artwork.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mt-4">
            Thank you for visiting my website!
          </p>

          <p className="mt-8 mb-4 text-lg font-semibold text-gray-800">
            Social Media Links
          </p>

          {/* Social Links */}
          <div className="flex space-x-6">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 hover:bg-blue-300 shadow-md transition duration-300 transform hover:scale-110"
            >
              <img src={FaceBookIcon} className="w-6 h-6" alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/cremlon_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-300 shadow-md transition duration-300 transform hover:scale-110"
            >
              <img src={InstagramIcon} className="w-6 h-6" alt="Instagram" />
            </a>
            <a
              href="https://wa.me/7003262742"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-300 shadow-md transition duration-300 transform hover:scale-110"
            >
              <img src={WhatsAppIcon} className="w-6 h-6" alt="WhatsApp" />
            </a>
            <a
              href="https://www.youtube.com/@cremlonart"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-300 shadow-md transition duration-300 transform hover:scale-110"
            >
              <img src={YoutubeIcon} className="w-6 h-6" alt="YouTube" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
