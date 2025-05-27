import React, { useEffect, useState } from "react";

const RecentListings = () => {
  const [cars, setCars] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/recent-cars") // ✅ Corrected
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Fetched cars:", data);
  //       setCars(data);
  //     })
  //     .catch((err) => console.error("Fetch error:", err));
  // }, []);
useEffect(() => {
    fetch("http://localhost:5000/recent-cars")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched cars:", data);
        if (Array.isArray(data)) {
          setCars(data);
        } else if (Array.isArray(data.cars)) {
          setCars(data.cars); // If the response is { cars: [...] }
        } else {
          console.error("Expected array but got:", data);
          setCars([]); // fallback
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCars([]); // fallback on error
      });
  }, []); // Empty dependency array to run only once on mount

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300"
            data-aos="fade-up"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
            <h3 className="text-xl font-semibold">{car.model}</h3>

<p className="text-gray-600">${car.price}/day</p>

<p className="mt-2 text-sm text-gray-500">
  Booking Count: {car.booking_count}
</p>

<p>
  <span
    className={`inline-block mt-2 px-3 py-1 text-sm font-medium rounded-full ${
      car.is_available
        ? "bg-green-100 text-green-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {car.is_available ? "Available" : "Not Available"}
  </span>
</p>

<p className="text-sm text-gray-400">
  {car.date_posted}
</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListings;
