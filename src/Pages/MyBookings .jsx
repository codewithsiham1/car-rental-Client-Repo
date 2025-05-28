// import { useEffect, useState } from "react";

// const MyBookings = ({ user }) => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [showModifyModal, setShowModifyModal] = useState(false);
//   const [newDates, setNewDates] = useState({ start: "", end: "" });

//   useEffect(() => {
//     if (!user?.email) return;
//     fetch(`http://localhost:5000/bookings?email=${user.email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       });
//   }, [user]);

//   const cancelBooking = async () => {
//     if (!selectedBooking) return;
//     try {
//       const res = await fetch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: "canceled" }),
//       });
//       if (res.ok) {
//         setBookings((prev) =>
//           prev.map((b) =>
//             b._id === selectedBooking._id ? { ...b, status: "canceled" } : b
//           )
//         );
//         setShowCancelModal(false);
//       }
//     } catch (err) {
//       alert("Failed to cancel booking.");
//     }
//   };

//   const modifyBookingDate = async () => {
//     if (!selectedBooking) return;
//     try {
//       const res = await fetch(`http://localhost:5000/bookings/${selectedBooking._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ startDate: newDates.start, endDate: newDates.end }),
//       });
//       if (res.ok) {
//         setBookings((prev) =>
//           prev.map((b) =>
//             b._id === selectedBooking._id
//               ? { ...b, startDate: newDates.start, endDate: newDates.end }
//               : b
//           )
//         );
//         setShowModifyModal(false);
//       }
//     } catch (err) {
//       alert("Failed to update booking dates.");
//     }
//   };

//   if (loading) return <p>Loading bookings...</p>;

//   return (
//     <div className="p-4 max-w-7xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">My Bookings</h2>

//       {bookings.length === 0 ? (
//         <p>You have no bookings yet.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border">
//             <thead>
//               <tr className="bg-gray-200 text-left">
//                 <th className="p-2 border">Car Image</th>
//                 <th className="p-2 border">Car Model</th>
//                 <th className="p-2 border">Booking Date</th>
//                 <th className="p-2 border">Total Price</th>
//                 <th className="p-2 border">Status</th>
//                 <th className="p-2 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((booking) => (
//                 <tr
//                   key={booking._id}
//                   className="hover:bg-gray-100"
//                 >
//                   <td className="p-2 border">
//                     <img src={booking.carImage} alt={booking.carModel} className="w-20 h-12 object-cover rounded" />
//                   </td>
//                   <td className="p-2 border font-semibold">{booking.carModel}</td>
//                   <td className="p-2 border">{new Date(booking.bookingDate).toLocaleString()}</td>
//                   <td className="p-2 border">${booking.totalPrice}</td>
//                   <td className="p-2 border capitalize">{booking.status}</td>
//                   <td className="p-2 border space-x-2">
//                     <button
//                       disabled={booking.status === "canceled"}
//                       onClick={() => {
//                         setSelectedBooking(booking);
//                         setShowModifyModal(true);
//                         setNewDates({ start: booking.startDate || "", end: booking.endDate || "" });
//                       }}
//                       className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       🗓 Modify Date
//                     </button>
//                     <button
//                       disabled={booking.status === "canceled"}
//                       onClick={() => {
//                         setSelectedBooking(booking);
//                         setShowCancelModal(true);
//                       }}
//                       className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
//                     >
//                       🗑 Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Cancel Confirmation Modal */}
//       {showCancelModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white p-6 rounded shadow max-w-sm w-full">
//             <p className="mb-4">Are you sure you want to cancel this booking?</p>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowCancelModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 No
//               </button>
//               <button
//                 onClick={cancelBooking}
//                 className="px-4 py-2 bg-red-600 text-white rounded"
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modify Date Modal */}
//       {showModifyModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
//           <div className="bg-white p-6 rounded shadow max-w-sm w-full">
//             <h3 className="mb-4 font-semibold">Modify Booking Dates</h3>
//             <label className="block mb-2">
//               Start Date:
//               <input
//                 type="datetime-local"
//                 value={newDates.start}
//                 onChange={(e) => setNewDates((prev) => ({ ...prev, start: e.target.value }))}
//                 className="border p-2 rounded w-full"
//               />
//             </label>
//             <label className="block mb-4">
//               End Date:
//               <input
//                 type="datetime-local"
//                 value={newDates.end}
//                 onChange={(e) => setNewDates((prev) => ({ ...prev, end: e.target.value }))}
//                 className="border p-2 rounded w-full"
//               />
//             </label>
//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setShowModifyModal(false)}
//                 className="px-4 py-2 border rounded"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={modifyBookingDate}
//                 className="px-4 py-2 bg-blue-600 text-white rounded"
//               >
//                 Save
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;


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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Bookings</h2>

      {bookings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="border rounded shadow p-4">
              <img
                src={booking.carImage}
                alt={booking.carName}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{booking.carName}</h3>
              <p>Price: ${booking.rentalPrice}/day</p>
              <p>Date: {new Date(booking.bookingDate).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;
