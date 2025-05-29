import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Authcontext from "../Context/Authcontext";

const MyBookings = () => {
  const { user } = useContext(Authcontext);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/bookings?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch(() => toast.error("Failed to load bookings."));
    }
  }, [user]);

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        My Bookings
      </h2>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="border rounded-xl shadow-md hover:shadow-lg transition p-4 bg-white"
            >
              <img
                src={booking.carImage}
                alt={booking.carName}
                className="w-full h-44 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold mt-3">{booking.carName}</h3>
              <p className="text-gray-600 text-sm mt-1">
                Price: <span className="font-medium">${booking.rentalPrice}/day</span>
              </p>
              <p className="text-gray-500 text-sm">
                Date:{" "}
                {new Date(booking.bookingDate).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
