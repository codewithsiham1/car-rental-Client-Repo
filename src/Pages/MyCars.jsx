import React, { useContext, useEffect, useState } from "react";
import Authcontext from "../Context/Authcontext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const MyCars = () => {
  const { user } = useContext(Authcontext);
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("date_desc");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  const fetchCars = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/cars?ownerEmail=${user.email}&sort=${sortOption}`
      );
      if (!response.ok) throw new Error("Failed to load cars");
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

  const sortOptions = [
    { value: "date_desc", label: "Date Added: Newest First" },
    { value: "date_asc", label: "Date Added: Oldest First" },
    { value: "price_asc", label: "Price: Lowest First" },
    { value: "price_desc", label: "Price: Highest First" },
  ];

  const openUpdateModal = (car) => {
    setCurrentCar({ ...car });
    setShowUpdateModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentCar((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  const openDeleteModal = (car) => {
    setCarToDelete(car);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!carToDelete) return;
    try {
      const response = await fetch(
        `http://localhost:5000/cars/${carToDelete._id}`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Failed to delete car");
      toast.success("Car deleted successfully");
      setShowDeleteModal(false);
      fetchCars();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) return <p className="p-4">Loading...</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
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
        <div className="overflow-x-auto">
          <table className="hidden md:table w-full border-collapse border text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1">Image</th>
                <th className="border px-2 py-1">Model</th>
                <th className="border px-2 py-1">Price</th>
                <th className="border px-2 py-1">Bookings</th>
                <th className="border px-2 py-1">Available</th>
                <th className="border px-2 py-1">Added</th>
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

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {cars.map((car) => (
              <div key={car._id} className="border rounded p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-24 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold">{car.name}</h3>
                    <p>Price: ${car.price}</p>
                    <p>Bookings: {car.bookingCount || 0}</p>
                    <p>Available: {car.available ? "Yes" : "No"}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(car.createdAt).toLocaleDateString()}
                    </p>
                    <div className="mt-2 flex gap-2">
                      <button
                        onClick={() => openUpdateModal(car)}
                        className="bg-yellow-400 px-3 py-1 text-sm rounded hover:bg-yellow-500"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => openDeleteModal(car)}
                        className="bg-red-500 px-3 py-1 text-sm rounded text-white hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals (Same as before, responsive by default due to Tailwind) */}
      {/* Update Modal */}
      {showUpdateModal && currentCar && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <form
            onSubmit={handleUpdateSubmit}
            className="bg-white p-6 m-4 rounded-lg max-w-xl w-full"
          >
            <h3 className="text-xl font-bold mb-4">Update Car</h3>
            {/* Form Fields */}
            {[
              ["Car Model", "name", "text"],
              ["Daily Rental Price", "price", "number"],
              ["Vehicle Registration Number", "registrationNumber", "text"],
              ["Image URL", "image", "text"],
              ["Features (comma separated)", "features", "text"],
            ].map(([label, name, type]) => (
              <div key={name} className="mb-3">
                <label className="block font-semibold mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={currentCar[name] || ""}
                  onChange={handleUpdateChange}
                  className="w-full border p-2 rounded"
                />
              </div>
            ))}

            <div className="mb-3">
              <label className="block font-semibold mb-1">Availability</label>
              <select
                name="available"
                value={currentCar.available ? "true" : "false"}
                onChange={(e) =>
                  setCurrentCar((prev) => ({
                    ...prev,
                    available: e.target.value === "true",
                  }))
                }
                className="w-full border p-2 rounded"
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block font-semibold mb-1">Description</label>
              <textarea
                name="description"
                value={currentCar.description || ""}
                onChange={handleUpdateChange}
                rows={3}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex justify-end gap-3 mt-4">
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
          <div className="bg-white p-6 m-4 rounded-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>{carToDelete.name}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-3">
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
