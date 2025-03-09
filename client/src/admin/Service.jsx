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
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Services</h1>
      
      {/* Loading State */}
      {loading && <p>Loading services...</p>}
      
      {/* Error State */}
      {error && <p className="text-red-500">Error: {error}</p>}
      
      {/* Display Services */}
      {services && services.length > 0 ? (
        <div className="flex gap-2 flex-wrap ml-6">
          {services.map((service) => (
            <div key={service._id} className="mb-2 bg-gray-200 gap-2 p-2">
                <p>Frame Size : {service.name} inch</p>
                <p>Price : {service.price}</p>
                <p>Details : {service.description}</p>
                <img className="w-48" src={service.image.url} alt={service.image.name} />
                <Button className="w-full" onClick={()=> navigate(`/admin/dashboard/service/edit/${service._id}`)}>Edit</Button>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p>No services available.</p>
      )}
    </section>
  );
};

export default Service;
