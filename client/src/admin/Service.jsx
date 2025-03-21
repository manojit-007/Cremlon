import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllServices } from "@/store/ServiceSlice";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Service = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selectors to get the state from the service slice
  const { services, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getAllServices());
  }, [dispatch]);

  return (
    <section className="p-6">
      <h1 className="text-3xl font-bold mb-6">All Services</h1>

      {/* Loading State */}
      {loading && <p className="text-lg text-gray-500">Loading services...</p>}

      {/* Error State */}
      {error && <p className="text-lg text-red-500">Error: {error}</p>}

      {/* Display Services */}
      {services && services.length > 0 ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200"
            >
              <img
                className="w-full h-48 object-cover rounded-t-lg"
                src={service.image.url}
                alt={service.image.name || "Service Image"}
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{service.name} inch</h2>
                <p className="text-gray-600 mb-2">
                  <strong>Price:</strong> ${service.price}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Details:</strong> {service.description}
                </p>
                <Button
                  className="w-full"
                  onClick={() =>
                    navigate(`/admin/dashboard/service/edit/${service._id}`)
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
              onClick={() => navigate("/admin/dashboard/service/add")}
            >
              Add New Service
            </Button>
          </div>
    </section>
  );
};

export default Service;
