import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import Authcontext from '../Context/Authcontext';

const AddCarPage = () => {
  const { user } = useContext(Authcontext);
  const [loading, setLoading] = useState(false);

  const handleAddCar = async (e) => {
  e.preventDefault();
  setLoading(true);

  const form = e.target;

  const newCar = {
    model: form.model.value,
    price: parseFloat(form.price.value),
    availability: form.availability.value,
    regNumber: form.regNumber.value,
    features: form.features.value,
    description: form.description.value,
    image: form.image.value,
    location: form.location.value,
    bookingCount: 0,
    ownerEmail: user?.email || "test@example.com",
    ownerName: user?.displayName || "Test User",
    dateAdded: new Date(),
    bookingStatus: "Available"
  };

  try {
    const res = await fetch("http://localhost:5000/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newCar)
    });

    const data = await res.json();

    if (data.insertedId) {
      toast.success("Car added successfully!");
      form.reset();
    } else {
      toast.error("Failed to add car");
    }
  } catch (error) {
    console.error("Error posting car:", error);
    toast.error("Something went wrong!");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add a New Car</h2>

      <form onSubmit={handleAddCar} className="space-y-4">
        <input name="model" required placeholder="Car Model" className="input input-bordered w-full" />
        <input name="price" required type="number" placeholder="Daily Rental Price" className="input input-bordered w-full" />
        <input name="availability" required placeholder="Availability (Yes/No)" className="input input-bordered w-full" />
        <input name="regNumber" required placeholder="Vehicle Registration Number" className="input input-bordered w-full" />
        <input name="features" required placeholder="Features (e.g., GPS, AC)" className="input input-bordered w-full" />
        <textarea name="description" required placeholder="Description" className="textarea textarea-bordered w-full" />
        <input name="image" required placeholder="Image URL" className="input input-bordered w-full" />
        <input name="location" required placeholder="Location" className="input input-bordered w-full" />

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Processing..." : "Submit Car Info"}
        </button>
      </form>
    </div>
  );
};

export default AddCarPage;

