import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getAllPosts } from "@/store/PostSlice";

const AllPosts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { postsData = [], loading = false, error = null } = useSelector(
    (state) => state.post || {}
  );

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      {loading && <p className="text-lg text-gray-500">Loading services...</p>}
      {error && <p className="text-lg text-red-500">Error: {error}</p>}
      {postsData.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {postsData.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={post.image?.url || "/placeholder.jpg"}
                alt={post.image?.name || "post Image"}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.name}</h2>
                <p className="text-gray-600 mb-4">
                  <strong>Feedback:</strong> {post.comment || "No details"}
                </p>
                <Button
                  className="w-full"
                  onClick={() =>
                    navigate(`/admin/dashboard/post/edit/${post._id}`)
                  }
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-lg text-gray-500">No services available.</p>
      )}
      <div className="w-fit mt-4">
        <Button
          className="w-full text-white bg-blue-500 hover:bg-blue-400"
          onClick={() => navigate("/admin/dashboard/post/add")}
        >
          Add New Post
        </Button>
      </div>
    </section>
  );
};

export default AllPosts;
