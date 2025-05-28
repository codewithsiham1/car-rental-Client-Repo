import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Authcontext from "../Context/Authcontext";

const AvailableCars = () => {
  const { user } = useContext(Authcontext);
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetch(`http://localhost:5000/all-cars?sort=${sortOption}`)
      .then((res) => res.json())
      .then((data) => {
        setCars(data);
      })
      .catch(() => {
        toast.error("Failed to fetch cars");
      });
  }, [sortOption]);

  const filteredCars = cars.filter((car) => {
    const term = searchTerm.toLowerCase();
    return (
      (car?.name || "").toLowerCase().includes(term) ||
      (car?.brand || "").toLowerCase().includes(term) ||
      (car?.location || "").toLowerCase().includes(term)
    );
  });

  const handleBookNow = async (car) => {
    if (!user) {
      toast.warning("Please login first to book a car.");
      navigate("/sign-in");
      return;
    }

    if (!car.available) {
      toast.warning("This car is currently unavailable.");
      return;
    }

    const bookingData = {
      carId: car._id,
      userEmail: user.email,
      carName: car.name,
      carImage: car.image,
      rentalPrice: car.price,
      bookingDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.insertedId) {
        toast.success("Car booked successfully!");
        navigate("/my-booking");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch {
      toast.error("Failed to book car. Please try again.");
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Search, Sort, View Mode */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="text"
          placeholder="Search by model, brand, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full md:w-1/3"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="newest">Date Added: Newest First</option>
          <option value="oldest">Date Added: Oldest First</option>
          <option value="price_low">Price: Lowest First</option>
          <option value="price_high">Price: Highest First</option>
        </select>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`btn ${viewMode === "grid" ? "btn-primary" : "btn-outline"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`btn ${viewMode === "list" ? "btn-primary" : "btn-outline"}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Display Cars */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car._id} className="border rounded-lg overflow-hidden shadow-sm">
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold">{car.name || "Unknown Model"}</h2>
                <p className="text-gray-700">Price: ${car.price}/day</p>
                <p className="text-gray-600">Brand: {car.brand || "N/A"}</p>
                <p className="text-gray-600">Location: {car.location || "N/A"}</p>
                <p className="text-gray-600">Availability: {car.available ? "Yes" : "No"}</p>
                <button
                  onClick={() => handleBookNow(car)}
                  className="mt-4 btn btn-primary w-full"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCars.map((car) => (
            <div key={car._id} className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded shadow">
              <img
                src={car.image}
                alt={car.name}
                className="w-full md:w-32 h-24 object-cover rounded"
              />
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{car.name}</h2>
                <p className="text-gray-700">Price: ${car.price}/day</p>
                <p className="text-gray-600">Brand: {car.brand}</p>
                <p className="text-gray-600">Location: {car.location}</p>
                <p className="text-gray-600">Availability: {car.available ? "Yes" : "No"}</p>
              </div>
              <button
                onClick={() => handleBookNow(car)}
                className="btn btn-primary w-full md:w-auto"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;


