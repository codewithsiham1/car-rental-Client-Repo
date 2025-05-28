// import { useState } from 'react';
// import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button';
// import { CalendarDays, Trash2 } from 'lucide-react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const BookingsTable = ({ bookings }) => {
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [newDates, setNewDates] = useState({ start: null, end: null });
//   const [isCancelModalOpen, setCancelModalOpen] = useState(false);
//   const [isModifyModalOpen, setModifyModalOpen] = useState(false);
//   const [allBookings, setAllBookings] = useState(bookings);

//   const handleCancelBooking = () => {
//     setAllBookings(prev =>
//       prev.map(b =>
//         b.id === selectedBooking.id ? { ...b, status: 'Canceled' } : b
//       )
//     );
//     setCancelModalOpen(false);
//   };

//   const handleModifyBooking = () => {
//     setAllBookings(prev =>
//       prev.map(b =>
//         b.id === selectedBooking.id
//           ? {
//               ...b,
//               bookingDate: newDates.start,
//               endDate: newDates.end,
//             }
//           : b
//       )
//     );
//     setModifyModalOpen(false);
//   };

//   return (
//     <div className="overflow-x-auto mt-6">
//       <table className="min-w-full bg-white rounded-xl shadow-sm">
//         <thead>
//           <tr className="bg-gray-100 text-gray-700 text-left text-sm">
//             <th className="p-3 font-semibold">Car Image</th>
//             <th className="p-3 font-semibold">Car Model</th>
//             <th className="p-3 font-semibold">Booking Date</th>
//             <th className="p-3 font-semibold">Total Price</th>
//             <th className="p-3 font-semibold">Status</th>
//             <th className="p-3 font-semibold">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allBookings.map((booking, index) => (
//             <tr
//               key={booking.id}
//               className={`border-b hover:bg-gray-50 text-sm ${
//                 index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//               }`}
//             >
//               <td className="p-3">
//                 <img
//                   src={booking.carImage}
//                   alt="car"
//                   className="w-16 h-10 object-cover rounded-md"
//                 />
//               </td>
//               <td className="p-3">{booking.carModel}</td>
//               <td className="p-3">
//                 {new Date(booking.bookingDate).toLocaleString('en-GB')}
//               </td>
//               <td className="p-3">${booking.totalPrice.toFixed(2)}</td>
//               <td className="p-3">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     booking.status === 'Confirmed'
//                       ? 'bg-green-100 text-green-700'
//                       : booking.status === 'Pending'
//                       ? 'bg-yellow-100 text-yellow-700'
//                       : 'bg-red-100 text-red-700'
//                   }`}
//                 >
//                   {booking.status}
//                 </span>
//               </td>
//               <td className="p-3 flex gap-2">
//                 <Button
//                   variant="destructive"
//                   size="sm"
//                   onClick={() => {
//                     setSelectedBooking(booking);
//                     setCancelModalOpen(true);
//                   }}
//                 >
//                   <Trash2 className="w-4 h-4 mr-1" />
//                   Cancel
//                 </Button>

//                 <Button
//                   variant="secondary"
//                   size="sm"
//                   onClick={() => {
//                     setSelectedBooking(booking);
//                     setModifyModalOpen(true);
//                     setNewDates({
//                       start: new Date(booking.bookingDate),
//                       end: new Date(booking.endDate),
//                     });
//                   }}
//                 >
//                   <CalendarDays className="w-4 h-4 mr-1" />
//                   Modify Date
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Cancel Confirmation Modal */}
//       <Dialog open={isCancelModalOpen} onOpenChange={setCancelModalOpen}>
//         <DialogContent>
//           <h2 className="text-lg font-semibold mb-4">Cancel Booking</h2>
//           <p className="mb-6">Are you sure you want to cancel this booking?</p>
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={() => setCancelModalOpen(false)}>
//               No
//             </Button>
//             <Button variant="destructive" onClick={handleCancelBooking}>
//               Yes, Cancel
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Modify Date Modal */}
//       <Dialog open={isModifyModalOpen} onOpenChange={setModifyModalOpen}>
//         <DialogContent>
//           <h2 className="text-lg font-semibold mb-4">Modify Booking Dates</h2>
//           <div className="flex flex-col gap-4">
//             <div>
//               <label className="block mb-1">Start Date:</label>
//               <DatePicker
//                 selected={newDates.start}
//                 onChange={(date) => setNewDates(prev => ({ ...prev, start: date }))}
//                 selectsStart
//                 startDate={newDates.start}
//                 endDate={newDates.end}
//                 className="border px-2 py-1 rounded w-full"
//               />
//             </div>
//             <div>
//               <label className="block mb-1">End Date:</label>
//               <DatePicker
//                 selected={newDates.end}
//                 onChange={(date) => setNewDates(prev => ({ ...prev, end: date }))}
//                 selectsEnd
//                 startDate={newDates.start}
//                 endDate={newDates.end}
//                 minDate={newDates.start}
//                 className="border px-2 py-1 rounded w-full"
//               />
//             </div>
//           </div>
//           <div className="flex justify-end gap-2 mt-4">
//             <Button variant="outline" onClick={() => setModifyModalOpen(false)}>
//               Cancel
//             </Button>
//             <Button onClick={handleModifyBooking}>Confirm</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default BookingsTable;


// BookingsTable.jsx
// import { useEffect, useState } from "react";

// const BookingsTable = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // API থেকে ডেটা লোড
//   useEffect(() => {
//     fetch("http://localhost:5000/bookings")
//       .then((res) => res.json())
//       .then((data) => {
//         setBookings(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching bookings:", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto border w-full">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="border px-4 py-2">Game Title</th>
//             <th className="border px-4 py-2">Renter</th>
//             <th className="border px-4 py-2">Price</th>
//             <th className="border px-4 py-2">Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.map((booking, index) => (
//             <tr key={index}>
//               <td className="border px-4 py-2">{booking.gameTitle}</td>
//               <td className="border px-4 py-2">{booking.renterName}</td>
//               <td className="border px-4 py-2">${booking.price}</td>
//               <td className="border px-4 py-2">{booking.date}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookingsTable;

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table-auto border w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Car Model</th>
            <th className="border px-4 py-2">Brand</th>
            <th className="border px-4 py-2">Renter</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{booking.model}</td>
              <td className="border px-4 py-2">{booking.brand}</td>
              <td className="border px-4 py-2">{booking.renterName}</td>
              <td className="border px-4 py-2">${booking.price}</td>
              <td className="border px-4 py-2">{booking.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
