import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../Context/Authcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyCars = () => {
  const { user } = useContext(Authcontext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("date_desc");

  // Update modal states
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);

  // Delete modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  // Fetch user's cars from backend
  const fetchCars = async () => {
    if (!user?.email) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/cars?ownerEmail=${user.email}&sort=${sortOption}`
      );
      if (!response.ok) {
        throw new Error("Failed to load cars");
      }
      const data = await response.json();
      setCars(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [user, sortOption]);

  // Sorting options map
  const sortOptions = [
    { value: "date_desc", label: "Date Added: Newest First" },
    { value: "date_asc", label: "Date Added: Oldest First" },
    { value: "price_asc", label: "Price: Lowest First" },
    { value: "price_desc", label: "Price: Highest First" },
  ];

  // Open update modal with selected car
  const openUpdateModal = (car) => {
    setCurrentCar({ ...car }); // make a copy to edit
    setShowUpdateModal(true);
  };

  // Handle input change inside update modal
  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentCar((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit updated car data
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!currentCar.name || !currentCar.price) {
      toast.warning("Name and Price are required");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/cars/${currentCar._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentCar),
        }
      );
      if (!response.ok) throw new Error("Failed to update car");
      toast.success("Car updated successfully");
      setShowUpdateModal(false);
      fetchCars();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Open delete confirmation modal
  const openDeleteModal = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (!carToDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/cars/${carToDelete._id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete car");
      toast.success("Car deleted successfully");
      setShowDeleteModal(false);
      fetchCars();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Cars</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">Sort By:</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {cars.length === 0 ? (
        <p>
          You have no cars added.{" "}
          <Link to="/add-car" className="text-blue-600 underline">
            Add a car now
          </Link>
        </p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Image</th>
              <th className="border px-2 py-1">Model</th>
              <th className="border px-2 py-1">Daily Rental Price</th>
              <th className="border px-2 py-1">Booking Count</th>
              <th className="border px-2 py-1">Availability</th>
              <th className="border px-2 py-1">Date Added</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td className="border p-1 text-center">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-20 h-16 object-cover rounded"
                  />
                </td>
                <td className="border px-2 py-1">{car.name}</td>
                <td className="border px-2 py-1">${car.price}</td>
                <td className="border px-2 py-1">{car.bookingCount || 0}</td>
                <td className="border px-2 py-1">
                  {car.available ? "Yes" : "No"}
                </td>
                <td className="border px-2 py-1">
                  {new Date(car.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-2 py-1 space-x-2 text-center">
                  <button
                    onClick={() => openUpdateModal(car)}
                    className="bg-yellow-400 px-2 py-1 rounded hover:bg-yellow-500"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => openDeleteModal(car)}
                    className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Update Modal */}
      {showUpdateModal && currentCar && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 rounded shadow-lg max-w-lg w-full"
          >
            <h3 className="text-xl font-bold mb-4">Update Car</h3>

            <label className="block mb-1 font-semibold">Car Model</label>
            <input
              type="text"
              name="name"
              value={currentCar.name}
              onChange={handleUpdateChange}
              className="w-full border p-2 rounded mb-3"
              required
            />

            <label className="block mb-1 font-semibold">Daily Rental Price</label>
            <input
              type="number"
              name="price"
              value={currentCar.price}
              onChange={handleUpdateChange}
              className="w-full border p-2 rounded mb-3"
              required
            />

            <label className="block mb-1 font-semibold">Availability</label>
            <select
              name="available"
              value={currentCar.available ? "true" : "false"}
              onChange={(e) =>
                setCurrentCar((prev) => ({
                  ...prev,
                  available: e.target.value === "true",
                }))
              }
              className="w-full border p-2 rounded mb-3"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <label className="block mb-1 font-semibold">
              Vehicle Registration Number
            </label>
            <input
              type="text"
              name="registrationNumber"
              value={currentCar.registrationNumber || ""}
              onChange={handleUpdateChange}
              className="w-full border p-2 rounded mb-3"
            />

            <label className="block mb-1 font-semibold">
              Features (comma separated)
            </label>
            <input
              type="text"
              name="features"
              value={currentCar.features || ""}
              onChange={handleUpdateChange}
              placeholder="e.g., GPS, AC"
              className="w-full border p-2 rounded mb-3"
            />

            <label className="block mb-1 font-semibold">Description</label>
            <textarea
              name="description"
              value={currentCar.description || ""}
              onChange={handleUpdateChange}
              className="w-full border p-2 rounded mb-3"
              rows={3}
            />

            <label className="block mb-1 font-semibold">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={currentCar.image || ""}
              onChange={handleUpdateChange}
              className="w-full border p-2 rounded mb-3"
              placeholder="Enter image URL"
            />

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && carToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{carToDelete.name}</strong>?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
