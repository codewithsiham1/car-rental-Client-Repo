import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
  const [car, setCar] = useState({
    name: "",
    price: "",
    ownerEmail: "user@example.com", // replace with auth user email
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
    <div style={{ padding: "20px" }}>
      <h2>Add New Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input
            type="text"
            name="name"
            value={car.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price (per day):</label><br />
          <input
            type="number"
            name="price"
            value={car.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label><br />
          <input
            type="text"
            name="image"
            value={car.image}
            onChange={handleChange}
          />
        </div>
        <br />
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default AddCar;
