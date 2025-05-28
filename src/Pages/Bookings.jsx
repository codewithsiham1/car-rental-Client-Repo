import React, { useEffect, useState } from "react";
import axios from "axios";

const Bookings = () => {
  const userEmail = "user@example.com"; // Replace with logged-in user email
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/bookings?email=${userEmail}`)
      .then((res) => setBookings(res.data))
      .catch(console.error);
  }, [userEmail]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Car Name</th>
              <th>From</th>
              <th>To</th>
              <th>User Email</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.carName}</td>
                <td>{b.fromDate}</td>
                <td>{b.toDate}</td>
                <td>{b.userEmail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Bookings;
