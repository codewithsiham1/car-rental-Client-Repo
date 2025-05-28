import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Carsmy = () => {
      const userEmail = "user@example.com"; // TODO: replace with auth email
  const [cars, setCars] = useState([]);
  const [sort, setSort] = useState("newest");

  const fetchCars = () => {
    axios
      .get(`http://localhost:5000/cars?email=${userEmail}&sort=${sort}`)
      .then((res) => setCars(res.data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchCars();
  }, [sort]);

  const handleDelete = (id) => {
    if (!window.confirm("Delete this car?")) return;
    axios
      .delete(`http://localhost:5000/cars/${id}`)
      .then(() => fetchCars())
      .catch(console.error);
  };

    return (
    <div style={{ padding: "20px" }}>
      <h2>My Cars</h2>
      <label>
        Sort by:{" "}
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="price_low">Price Low to High</option>
          <option value="price_high">Price High to Low</option>
        </select>
      </label>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Owner Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car._id}>
              <td>{car.name}</td>
              <td>${car.price}</td>
              <td>{car.ownerEmail}</td>
              <td>
                <Link to={`/update-car/${car._id}`}>
                  <button>Edit</button>
                </Link>{" "}
                <button onClick={() => handleDelete(car._id)}>Delete</button>
              </td>
            </tr>
          ))}
          {cars.length === 0 && (
            <tr>
              <td colSpan="4">No cars found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
};

export default Carsmy;