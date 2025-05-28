// import React, { useState } from 'react';
// import CarListItem from './CarListItem';
// import CarBookingModal from './CarBookingModal';

// const CarList = ({ cars }) => {
//   const [selectedCar, setSelectedCar] = useState(null);

//   const handleBookNow = (car) => {
//     setSelectedCar(car);
//   };

//   const closeModal = () => {
//     setSelectedCar(null);
//   };

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {cars.map(car => (
//         <CarListItem key={car._id} car={car} onBook={handleBookNow} />
//       ))}

//       {selectedCar && (
//         <CarBookingModal car={selectedCar} onClose={closeModal} />
//       )}
//     </div>
//   );
// };

// export default CarList;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // hypothetical hook

const CarList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Local state for cars
  const [cars, setCars] = useState([]);

  // Fetch cars from API or use some dummy data
  useEffect(() => {
    // Example fetch call (replace URL with your backend API)
    fetch("/api/cars")
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

  return (
    <div>
      <h2>Available Cars</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {cars.length === 0 && <p>No cars available at the moment.</p>}

        {cars.map((car) => (
          <div
            key={car._id}
            style={{
              border: "1px solid #ccc",
              padding: "1rem",
              width: "250px",
              borderRadius: "8px",
            }}
          >
            <img
              src={car.imageUrl}
              alt={car.model}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <h3>{car.model}</h3>
            <p>Price per day: ${car.pricePerDay}</p>
            <p>Year: {car.year}</p>

            <button
              onClick={() => {
                if (!user) {
                  navigate("/login");
                } else {
                  navigate(`/book/${car._id}`);
                }
              }}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
