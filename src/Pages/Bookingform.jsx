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
    userEmail: "user@example.com", // replace with auth user email
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
        navigate("/");
      })
      .catch(() => alert("Booking failed"));
  };

  if (!car) return <p>Loading car info...</p>;
    return (
        <div style={{ padding: "20px" }}>
      <h2>Book Car: {car.name}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From Date:</label><br />
          <input type="date" name="fromDate" value={booking.fromDate} onChange={handleChange} required />
        </div>
        <div>
          <label>To Date:</label><br />
          <input type="date" name="toDate" value={booking.toDate} onChange={handleChange} required />
        </div>
        <br />
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
    );
};

export default Bookingform;