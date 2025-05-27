import { useContext, useEffect, useState } from "react";
import Authcontext from "../Context/Authcontext";
import { toast } from "react-toastify";

const MyCarsPage = () => {
  const { user } = useContext(Authcontext);
  const [cars, setCars] = useState([]);
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(false);
  const [editCar, setEditCar] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/cars?email=${user.email}&sort=${sortBy}`
      );
      const data = await res.json();
      setCars(data);
    } catch (err) {
      toast.error("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      const res = await fetch(`http://localhost:5000/cars/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        toast.success("Car deleted");
        fetchCars();
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedCar = {
      model: form.model.value,
      price: parseFloat(form.price.value),
      availability: form.availability.value,
      regNumber: form.regNumber.value,
      features: form.features.value,
      description: form.description.value,
      image: form.image.value,
      location: form.location.value,
    };
    try {
      const res = await fetch(`http://localhost:5000/cars/${editCar._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCar),
      });
      const data = await res.json();
      if (data.modifiedCount > 0) {
        toast.success("Car updated");
        setEditCar(null);
        fetchCars();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchCars();
  }, [sortBy]);

  if (!cars.length && !loading)
    return (
      <div className="text-center mt-20">
        <p className="text-lg">No cars found. </p>
        <a href="/add-car" className="btn mt-4">
          Add a Car
        </a>
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">My Cars</h2>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="select select-bordered"
        >
          <option value="newest">Date Added (Newest)</option>
          <option value="oldest">Date Added (Oldest)</option>
          <option value="price_low">Price (Lowest)</option>
          <option value="price_high">Price (Highest)</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Model</th>
              <th>Price</th>
              <th>Booking</th>
              <th>Available</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id}>
                <td>
                  <img src={car.image} alt={car.model} className="w-20" />
                </td>
                <td>{car.model}</td>
                <td>${car.price}</td>
                <td>{car.bookingCount || 0}</td>
                <td>{car.availability}</td>
                <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
                <td>
                  <button
                    onClick={() => setEditCar(car)}
                    className="btn btn-sm btn-info mr-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="btn btn-sm btn-error"
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
      {editCar && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleUpdate} className="space-y-3">
              <input name="model" defaultValue={editCar.model} className="input w-full" />
              <input name="price" type="number" defaultValue={editCar.price} className="input w-full" />
              <input name="availability" defaultValue={editCar.availability} className="input w-full" />
              <input name="regNumber" defaultValue={editCar.regNumber} className="input w-full" />
              <input name="features" defaultValue={editCar.features} className="input w-full" />
              <input name="image" defaultValue={editCar.image} className="input w-full" />
              <input name="location" defaultValue={editCar.location} className="input w-full" />
              <textarea name="description" defaultValue={editCar.description} className="textarea w-full" />
              <div className="modal-action">
                <button type="submit" className="btn btn-success">Save</button>
                <button onClick={() => setEditCar(null)} className="btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCarsPage;
