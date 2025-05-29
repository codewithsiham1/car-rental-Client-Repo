import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PageCarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${carId}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        setCar(data);
      })
      .catch(() => alert("Failed to load car details"))
      .finally(() => setLoading(false));
  }, [carId]);

  const handleBooking = () => {
    if (!car?.is_available) {
      alert("Car is not available for booking.");
      return;
    }

    const bookingData = {
      carId: car._id,
      model: car.model,
      brand: car.brand,
      price: car.price,
      renterName: "John Doe", // Replace with actual user info
      date: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Booking failed");
        return res.json();
      })
      .then(() => alert("Booking successful!"))
      .catch(() => alert("Booking failed"));
  };

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;
  if (!car) return <p className="text-center text-lg mt-10">Car not found.</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-center">
        {car.model} - {car.brand}
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
        <img
          src={car.image}
          alt={car.model}
          className="w-full max-w-md lg:max-w-lg rounded shadow-md object-cover"
        />

        <div className="w-full">
          <p className="text-lg mb-2">
            <strong>Price Per Day:</strong> ${car.price}
          </p>
          <p className="text-lg mb-2">
            <strong>Availability:</strong>{" "}
            <span className={car.is_available ? "text-green-600" : "text-red-600"}>
              {car.is_available ? "Available" : "Not Available"}
            </span>
          </p>

          <div className="mb-4">
            <p className="font-semibold">Features:</p>
            <ul className="list-disc list-inside pl-2">
              {car.features?.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          </div>

          <p className="mb-6 text-gray-700">{car.description}</p>

          <button
            onClick={handleBooking}
            disabled={!car.is_available}
            className={`w-full sm:w-auto px-6 py-3 rounded text-white font-semibold transition 
              ${car.is_available ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageCarDetails;



