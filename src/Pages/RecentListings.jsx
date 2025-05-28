import React, { useEffect, useState } from "react";

// Helper function to format 'dateAdded' to friendly text like "Added 2 days ago"
const timeSince = (dateString) => {
  const date = new Date(dateString);
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval > 1) return `Added ${interval} years ago`;
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) return `Added ${interval} months ago`;
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return `Added ${interval} day${interval > 1 ? 's' : ''} ago`;
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return `Added ${interval} hour${interval > 1 ? 's' : ''} ago`;
  interval = Math.floor(seconds / 60);
  if (interval >= 1) return `Added ${interval} minute${interval > 1 ? 's' : ''} ago`;
  return "Added just now";
};

// Normalize is_available value safely
const isAvailable = (val) => val === true || val === "true";

const RecentListings = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recent-cars")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setCars(data.slice(0, 8)); // Max 8 cars
        } else {
          console.error("Expected array but got:", data);
          setCars([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCars([]);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">Recent Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer
              hover:shadow-xl hover:scale-105 transform transition duration-300"
            data-aos="fade-up"
          >
            <img
              src={car.image}
              alt={car.model}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{car.model}</h3>
              <p className="text-gray-700 font-medium">${car.price}/day</p>
              <p className="mt-1 text-sm text-gray-500">
                Booking Count: {car.booking_count}
              </p>
              <p className="mt-2">
                <span
                  className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                    isAvailable(car.is_available)
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {isAvailable(car.is_available) ? "Available" : "Not Available"}
                </span>
              </p>
              <p className="mt-3 text-sm text-gray-400 italic">{timeSince(car.dateAdded)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentListings;




// import React, { useEffect, useState } from "react";

// // Helper function to format 'dateAdded' to friendly text like "Added 2 days ago"
// const timeSince = (dateString) => {
//   const date = new Date(dateString);
//   const seconds = Math.floor((new Date() - date) / 1000);

//   let interval = Math.floor(seconds / 31536000);
//   if (interval > 1) return `Added ${interval} years ago`;
//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) return `Added ${interval} months ago`;
//   interval = Math.floor(seconds / 86400);
//   if (interval >= 1) return `Added ${interval} day${interval > 1 ? 's' : ''} ago`;
//   interval = Math.floor(seconds / 3600);
//   if (interval >= 1) return `Added ${interval} hour${interval > 1 ? 's' : ''} ago`;
//   interval = Math.floor(seconds / 60);
//   if (interval >= 1) return `Added ${interval} minute${interval > 1 ? 's' : ''} ago`;
//   return "Added just now";
// };

// const RecentListings = () => {
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/recent-cars")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setCars(data.slice(0, 8)); // Make sure max 8 cars only
//         } else {
//           console.error("Expected array but got:", data);
//           setCars([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setCars([]);
//       });
//   }, []);

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-8 text-center">Recent Listings</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {cars.map((car) => (
//           <div
//             key={car._id}
//             className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer
//               hover:shadow-xl hover:scale-105 transform transition duration-300"
//             data-aos="fade-up"
//           >
//             <img
//               src={car.image}
//               alt={car.model}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold">{car.model}</h3>
//               <p className="text-gray-700 font-medium">${car.price}/day</p>
//               <p className="mt-1 text-sm text-gray-500">
//                 Booking Count: {car.booking_count}
//               </p>
//               <p className="mt-2">
//                 <span
//                   className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
//                     car.is_available
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {car.is_available ? "Available" : "Not Available"}
//                 </span>
//               </p>
//               <p className="mt-3 text-sm text-gray-400 italic">{timeSince(car.dateAdded)}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentListings;
