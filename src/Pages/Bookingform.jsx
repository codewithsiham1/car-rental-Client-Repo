import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Bookingform = () => {
  const { carId } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [booking, setBooking] = useState({
    carId,
    carName: "",
    userEmail: "user@example.com", // Replace with auth user email
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cars/${carId}`)
      .then((res) => {
        setCar(res.data);
        setBooking((b) => ({ ...b, carName: res.data.name }));
      })
      .catch(console.error);
  }, [carId]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!booking.fromDate || !booking.toDate) {
      alert("Please select booking dates");
      return;
    }

    axios
      .post("http://localhost:5000/bookings", booking)
      .then(() => {
        alert("Booking successful!");
        navigate("/my-booking");
      })
      .catch(() => alert("Booking failed"));
  };

  if (!car) return <p className="text-center mt-10">Loading car info...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Book Car: <span className="text-blue-600">{car.name}</span>
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">From Date:</label>
          <input
            type="date"
            name="fromDate"
            value={booking.fromDate}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">To Date:</label>
          <input
            type="date"
            name="toDate"
            value={booking.toDate}
            onChange={handleChange}
            required
            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default Bookingform;
