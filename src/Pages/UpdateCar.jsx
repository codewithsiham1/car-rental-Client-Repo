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
    <div style={{ padding: "20px" }}>
      <h2>Update Car</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label><br />
          <input type="text" name="name" value={car.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Price (per day):</label><br />
          <input type="number" name="price" value={car.price} onChange={handleChange} required />
        </div>
        <div>
          <label>Image URL:</label><br />
          <input type="text" name="image" value={car.image} onChange={handleChange} />
        </div>
        <br />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default UpdateCar;
