import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Authcontext from "../Context/Authcontext";

const AvailableCars = () => {
  const { user } = useContext(Authcontext);
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    fetch(`http://localhost:5000/all-cars?sort=${sortOption}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched cars:", data);
        setCars(data);
      })
      .catch((error) => {
        toast.error("Failed to fetch cars");
      });
  }, [sortOption]);

  const filteredCars = cars.filter((car) => {
    const term = searchTerm.toLowerCase();
    return (
      (car?.name || "").toLowerCase().includes(term) ||
      (car?.brand || "").toLowerCase().includes(term) ||
      (car?.location || "").toLowerCase().includes(term)
    );
  });

  const handleBookNow = async (car) => {
    if (!user) {
      toast.warning("Please login first to book a car.");
      navigate("/sign-in");
      return;
    }

    if (!car.available) {
      toast.warning("This car is currently unavailable.");
      return;
    }

    const bookingData = {
      carId: car._id,
      userEmail: user.email,
      carName: car.name,
      carImage: car.image,
      rentalPrice: car.price,
      bookingDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (result.insertedId) {
        toast.success("Car booked successfully!");
        navigate("/my-booking");
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch {
      toast.error("Failed to book car. Please try again.");
    }
  };

  return (
    <div className="p-4">
      {/* Search, Sort, View */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by model, brand, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-grow"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="newest">Date Added: Newest First</option>
          <option value="oldest">Date Added: Oldest First</option>
          <option value="price_low">Price: Lowest First</option>
          <option value="price_high">Price: Highest First</option>
        </select>

        <div>
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded-l border ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 rounded-r border ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white"}`}
          >
            List
          </button>
        </div>
      </div>

      {/* Display Cars */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <div key={car._id} className="border p-4 rounded shadow">
              <img src={car.image} alt={car.name} className="w-full h-48 object-cover rounded" />
              <h2 className="text-xl font-bold mt-2">{car.name || "Unknown Model"}</h2>
              <p className="text-gray-700">Price: ${car.price || "N/A"}/day</p>
              <p className="text-gray-600">Brand: {car.brand || "N/A"}</p>
              <p className="text-gray-600">Location: {car.location || "N/A"}</p>
              <p className="text-gray-600">Availability: {car.available ? "Yes" : "No"}</p>
              <button
                onClick={() => handleBookNow(car)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredCars.map((car) => (
            <div key={car._id} className="flex items-center border p-4 rounded shadow gap-4">
              <img src={car.image} alt={car.name} className="w-32 h-20 object-cover rounded" />
              <div className="flex-grow">
                <h2 className="text-xl font-bold">{car.name}</h2>
                <p className="text-gray-700">Price: ${car.price}/day</p>
                <p className="text-gray-600">Brand: {car.brand}</p>
                <p className="text-gray-600">Location: {car.location}</p>
                <p className="text-gray-600">Availability: {car.available ? "Yes" : "No"}</p>
              </div>
              <button
                onClick={() => handleBookNow(car)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;



// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Authcontext from "../Context/Authcontext";

// const AvailableCars = () => {
//   const { user } = useContext(Authcontext);
//   const navigate = useNavigate();

//   const [cars, setCars] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption] = useState("newest");
//   const [viewMode, setViewMode] = useState("grid");

//   useEffect(() => {
//     fetch(`http://localhost:5000/all-cars?sort=${sortOption}`)
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch cars");
//         return res.json();
//       })
//       .then((data) => setCars(data))
//       .catch((error) => {
//         toast.error(error.message || "Something went wrong");
//       });
//   }, [sortOption]);

//   const filteredCars = cars.filter((car) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       (car.name || "").toLowerCase().includes(term) ||
//       (car.brand || "").toLowerCase().includes(term) ||
//       (car.location || "").toLowerCase().includes(term)
//     );
//   });

//   const handleBookNow = async (car) => {
//     if (!user) {
//       toast.warning("Please login first to book a car.");
//       navigate("/login");
//       return;
//     }

//     if (!car.available) {
//       toast.warning("This car is currently unavailable.");
//       return;
//     }

//     const bookingData = {
//       carId: car._id,
//       userEmail: user.email,
//       carName: car.name,
//       carImage: car.image,
//       rentalPrice: car.price,
//       bookingDate: new Date().toISOString(),
//     };

//     try {
//       const response = await fetch("http://localhost:5000/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(bookingData),
//       });

//       const result = await response.json();

//       if (result.insertedId) {
//         toast.success("Car booked successfully!");
//         navigate("/my-bookings"); // ✅ redirect to My Bookings
//       } else {
//         toast.error("Booking failed. Please try again.");
//       }
//     } catch {
//       toast.error("Failed to book car. Please try again.");
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Search, Sort, View Buttons */}
//       <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <input
//           type="text"
//           placeholder="Search by model, brand, or location"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border p-2 rounded flex-grow"
//         />

//         <select
//           value={sortOption}
//           onChange={(e) => setSortOption(e.target.value)}
//           className="border p-2 rounded"
//         >
//           <option value="newest">Date Added: Newest First</option>
//           <option value="oldest">Date Added: Oldest First</option>
//           <option value="price_low">Price: Lowest First</option>
//           <option value="price_high">Price: Highest First</option>
//         </select>

//         <div>
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`px-3 py-1 rounded-l border ${
//               viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white"
//             }`}
//           >
//             Grid
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`px-3 py-1 rounded-r border ${
//               viewMode === "list" ? "bg-blue-600 text-white" : "bg-white"
//             }`}
//           >
//             List
//           </button>
//         </div>
//       </div>

//       {/* Display cars */}
//       {viewMode === "grid" ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCars.length > 0 ? (
//             filteredCars.map((car) => (
//               <div key={car._id} className="border p-4 rounded shadow">
//                 <img
//                   src={car.image}
//                   alt={car.name}
//                   className="w-full h-48 object-cover rounded"
//                 />
//                 <h2 className="text-xl font-bold mt-2">{car.name || "Unknown Model"}</h2>
//                 <p className="text-gray-700">Price: ${car.price}/day</p>
//                 <p className="text-gray-600">Brand: {car.brand || "N/A"}</p>
//                 <p className="text-gray-600">Location: {car.location || "N/A"}</p>
//                 <p className="text-gray-600">
//                   Availability: {car.available ? "Yes" : "No"}
//                 </p>
//                 <button
//                   onClick={() => handleBookNow(car)}
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No cars found.</p>
//           )}
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredCars.length > 0 ? (
//             filteredCars.map((car) => (
//               <div
//                 key={car._id}
//                 className="flex items-center border p-4 rounded shadow gap-4"
//               >
//                 <img
//                   src={car.image}
//                   alt={car.name}
//                   className="w-32 h-20 object-cover rounded"
//                 />
//                 <div className="flex-grow">
//                   <h2 className="text-xl font-bold">{car.name || "Unknown Model"}</h2>
//                   <p className="text-gray-700">Price: ${car.price}/day</p>
//                   <p className="text-gray-600">Brand: {car.brand || "N/A"}</p>
//                   <p className="text-gray-600">Location: {car.location || "N/A"}</p>
//                   <p className="text-gray-600">
//                     Availability: {car.available ? "Yes" : "No"}
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleBookNow(car)}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//                 >
//                   Book Now
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p>No cars found.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AvailableCars;




// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import Authcontext from "../Context/Authcontext";

// const AvailableCars = () => {
//   const { user } = useContext(Authcontext);
//   const navigate = useNavigate();
//   const [cars, setCars] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/all-cars") // <- Your backend URL here
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch cars");
//         return res.json();
//       })
//       .then((data) => setCars(data))
//       .catch((error) => {
//         toast.error(error.message || "Something went wrong");
//       });
//   }, []);

//   const handleBookNow = async (car) => {
//     if (!user) {
//       toast.warning("Please login first to book a car.");
//       navigate("/login");
//       return;
//     }

//     const bookingData = {
//       carId: car._id,
//       userEmail: user.email,
//       carName: car.name,
//       carImage: car.image,
//       rentalPrice: car.price,
//       bookingDate: new Date().toISOString(),
//     };

//     try {
//       const response = await fetch("http://localhost:5000/bookings", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bookingData),
//       });
//       const result = await response.json();

//       if (result.insertedId) {
//         toast.success("Car booked successfully!");
//       } else {
//         toast.error("Booking failed. Please try again.");
//       }
//     } catch (err) {
//       toast.error("Failed to book car. Please try again.");
//     }
//   };

//   return (
//     <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {cars.map((car) => (
//         <div key={car._id} className="border p-4 rounded shadow">
//           <img
//             src={car.image}
//             alt={car.name}
//             className="w-full h-48 object-cover rounded"
//           />
//           <h2 className="text-xl font-bold mt-2">{car.name}</h2>
//           <p className="text-gray-700">Price: ${car.price}/day</p>
//           <p className="text-gray-600">Type: {car.type}</p>
//           <p className="text-gray-600">
//             Availability: {car.available ? "Yes" : "No"}
//           </p>
//           <button
//             onClick={() => handleBookNow(car)}
//             className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//           >
//             Book Now
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AvailableCars;
