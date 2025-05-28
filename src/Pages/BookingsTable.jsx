import { useEffect, useState } from "react";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-6">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">All Bookings</h2>

      <div className="overflow-x-auto shadow border rounded">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100 text-sm text-gray-700 uppercase">
            <tr>
              <th className="py-3 px-6 text-left border-b">Car Model</th>
              <th className="py-3 px-6 text-left border-b">Brand</th>
              <th className="py-3 px-6 text-left border-b">Renter</th>
              <th className="py-3 px-6 text-left border-b">Price</th>
              <th className="py-3 px-6 text-left border-b">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {bookings.map((booking, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-6 border-b">{booking.model}</td>
                <td className="py-2 px-6 border-b">{booking.brand}</td>
                <td className="py-2 px-6 border-b">{booking.renterName}</td>
                <td className="py-2 px-6 border-b">${booking.price}</td>
                <td className="py-2 px-6 border-b">{booking.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsTable;
