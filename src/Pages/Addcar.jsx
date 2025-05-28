import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [car, setCar] = useState({
    name: "",
    price: "",
    ownerEmail: "user@example.com", // Replace with dynamic user email if needed
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!car.name || !car.price) {
      alert("Name and Price are required");
      return;
    }
    try {
      await axios.post("http://localhost:5000/cars", car);
      alert("Car added successfully!");
      navigate("/my-cars");
    } catch (error) {
      console.error(error);
      alert("Failed to add car");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-center mb-8 text-indigo-600">
        Add New Car
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-6"
      >
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Car Name</label>
          <input
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter car name"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Price (per day)</label>
          <input
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter rental price"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={car.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter image link"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Add Car
        </button>
      </form>
    </div>
  );
};

export default AddCar;
