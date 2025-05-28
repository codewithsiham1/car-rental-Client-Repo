import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // hypothetical hook

const CarList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Available Cars</h2>

      {cars.length === 0 ? (
        <p className="text-center text-gray-600">No cars available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car._id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={car.imageUrl}
                alt={car.model}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{car.model}</h3>
                <p className="text-gray-600 text-sm">Price per day: ${car.pricePerDay}</p>
                <p className="text-gray-600 text-sm mb-3">Year: {car.year}</p>
                <button
                  onClick={() => {
                    if (!user) {
                      navigate("/login");
                    } else {
                      navigate(`/book/${car._id}`);
                    }
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
