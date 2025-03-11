import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import Logo from "@/logo.jpg"
import About from "./About";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  // Fetch data from the "post" slice
  const {
    postsData = [],
    loading: postsLoading = false,
    error: postsError = null,
  } = useSelector((state) => state.post || {});

  // Fetch data from the "service" slice
  const {
    services = [],
    loading: servicesLoading = false,
    error: servicesError = null,
  } = useSelector((state) => state.service || {});

  return (
    <main className="p-6 ">
      <section
        id="home"
        className="w-11/12 max-w-3xl text-center mx-auto pt-8 h-screen flex flex-col items-center justify-center bg-white"
      >
        <img
          src={Logo}
          className="rounded-full w-64 mb-2 bg-sky-50 border border-gray-300 aspect-square"
          alt="Profile Avatar"
        />

        <h3 className="text-xl md:text-2xl mb-3">
          Hi! I'm <span className="font-bold">Sandip Sarkar</span>
        </h3>
        <h1 className="text-3xl sm:text-6xl lg:text-[66px] font-semibold">
          Freelancer Artist
        </h1>
        <p className="max-w-2xl mx-auto">
          Welcome to my portfolio, a space dedicated to showcasing my unique
          creative artwork, artistic expressions, and achievements.
        </p>

        <div className="mt-4">
          <span onClick={()=> navigate("/contact")}>
            <Button className="px-10 py-3 font-bold bg-black text-white rounded-full hover:bg-stone-950">
              Contact me
            </Button>
          </span>
        </div>
      </section>
      <About/>

      {/* Services Section */}
      <section className="mb-8">
        <h2 className="text-2xl mb-4 text-center font-bold">Services</h2>
        {servicesLoading ? (
          <p className="text-gray-500 text-center">Loading services...</p>
        ) : servicesError ? (
          <p className="text-red-500 text-center">
            Error loading services: {servicesError}
          </p>
        ) : services?.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl mx-auto">
            {services.map((service) => (
              <div
                key={service._id}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
              >
                {/* <img
                  src={service.image?.url || "https://via.placeholder.com/150"}
                  alt={service.name || "Service Image"}
                  className="w-full h-48 object-cover"
                /> */}
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    {service.name || " Service"}
                  </h3>
                  <p className="text-lg font-bold mb-2 text-gray-800">
                  Price - ₹{service.price || "Untitled Service"}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {service.description || "No description available."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">No services available.</p>
        )}
      </section>

      {/* Posts Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Work</h2>
        {postsLoading ? (
          <p className="text-gray-500 text-center">Loading posts...</p>
        ) : postsError ? (
          <p className="text-red-500 text-center">
            Error loading posts: {postsError}
          </p>
        ) : postsData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl m-auto px-6 py-10">
          {postsData.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl overflow-hidden shadow-lg z-0 border border-gray-200 hover:shadow-2xl hover:border-gray-300 transition duration-300"
            >
              {/* Image Section */}
              <div className=" group">
                <img
                  src={post.image.url}
                  alt={post.name || "Post Image"}
                  className="w-full h-64 z-0 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* Overlay on Hover */}
                {/* <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-medium px-4">
                    {post.comment || "No description available."}
                  </p>
                </div> */}
              </div>
              {/* Content Section */}
              {/* <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">
                  {post.name || "Untitled Post"}
                </h3>
                <p className="text-sm text-gray-500">
                  {post.comment || "No additional details provided."}
                </p>
              </div> */}
            </div>
          ))}
        </div>
        
        ) : (
          <p className="text-gray-500 text-center">No posts available.</p>
        )}
      </section>
    </main>
  );
};

export default Home;
