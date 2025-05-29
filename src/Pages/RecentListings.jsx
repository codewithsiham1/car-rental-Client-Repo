import React, { useEffect, useState } from "react";

// Helper: Format 'dateAdded' to relative time
const timeSince = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `Added ${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `Added ${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `Added ${interval} day${interval > 1 ? "s" : ""} ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `Added ${interval} hour${interval > 1 ? "s" : ""} ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `Added ${interval} minute${interval > 1 ? "s" : ""} ago`;
  return "Added just now";
};

// Normalize is_available value
const isAvailable = (val) => val === true || val === "true";

const RecentListings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recent-cars")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCars(data.slice(0, 8));
        } else {
          console.error("Expected array but got:", data);
          setCars([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCars([]);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">Recent Listings</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden 
              hover:shadow-xl hover:scale-105 transform transition duration-300"
            data-aos="fade-up"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-48 sm:h-56 md:h-60 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg sm:text-xl font-semibold">{car.model}</h3>
              <p className="text-gray-700 font-medium text-sm sm:text-base">
                ${car.price}/day
              </p>
              <p className="text-sm text-gray-500">
                Booking Count: {car.booking_count}
              </p>
              <span
                className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                  isAvailable(car.is_available)
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {isAvailable(car.is_available) ? "Available" : "Not Available"}
              </span>
              <p className="text-sm text-gray-400 italic">{timeSince(car.dateAdded)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListings;


