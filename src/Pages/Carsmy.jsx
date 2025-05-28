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
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Cars</h2>

      <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <label className="text-sm font-medium">
          Sort by:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="ml-2 border rounded px-2 py-1"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="price_low">Price Low to High</option>
            <option value="price_high">Price High to Low</option>
          </select>
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Owner Email</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="border px-4 py-2">{car.name}</td>
                <td className="border px-4 py-2">${car.price}</td>
                <td className="border px-4 py-2">{car.ownerEmail}</td>
                <td className="border px-4 py-2 space-x-2">
                  <Link to={`/update-car/${car._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">
                      Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {cars.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No cars found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Carsmy;
