import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    name: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch(console.error);
  }, [id]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/cars/${id}`, car)
      .then(() => {
        alert("Car updated!");
        navigate("/my-cars");
      })
      .catch(() => alert("Update failed"));
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Car</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold" htmlFor="name">
            Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="price">
            Price (per day):
          </label>
          <input
            id="price"
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold" htmlFor="image">
            Image URL:
          </label>
          <input
            id="image"
            type="text"
            name="image"
            value={car.image}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          Update Car
        </button>
      </form>
    </div>
  );
};

export default UpdateCar;
