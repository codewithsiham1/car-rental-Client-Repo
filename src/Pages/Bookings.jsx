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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">No bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-3 px-4 border-b">Car Name</th>
                <th className="py-3 px-4 border-b">From</th>
                <th className="py-3 px-4 border-b">To</th>
                <th className="py-3 px-4 border-b">User Email</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{b.carName}</td>
                  <td className="py-2 px-4 border-b">{b.fromDate}</td>
                  <td className="py-2 px-4 border-b">{b.toDate}</td>
                  <td className="py-2 px-4 border-b">{b.userEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Bookings;
