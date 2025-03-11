import React from "react";
import { useSelector } from "react-redux";

const Work = () => {
  const {
    postsData = [],
    loading: postsLoading = false,
    error: postsError = null,
  } = useSelector((state) => state.post || {});

  return (
    <section
      id="home"
      className="w-full max-w-6xl mx-auto py-16 px-6 text-center flex flex-col items-center justify-center bg-gray-50"
    >
      {/* Section Header */}
      <h2 className="text-3xl font-extrabold mb-8 text-gray-800">Work</h2>
      {/* Loading, Error, or Posts */}
      {postsLoading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : postsError ? (
        <p className="text-red-500">Error loading posts: {postsError}</p>
      ) : postsData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-screen-xl m-auto">
          {postsData.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-200 hover:shadow-xl hover:border-gray-300 transition duration-300"
            >
              {/* Image Section */}
              <div className="relative group">
                <img
                  src={post.image.url}
                  alt={post.name || "Post Image"}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Optional Overlay */}
                {/* <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white text-sm font-medium px-4">
                    {post.comment || "No description available."}
                  </p>
                </div> */}
              </div>
              {/* Content Section */}
              {/* <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
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
        <p className="text-gray-500">No posts available.</p>
      )}
    </section>
  );
};

export default Work;
