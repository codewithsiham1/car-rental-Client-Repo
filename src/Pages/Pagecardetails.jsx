import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PageCarDetails = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/cars/${carId}`)
      .then(res => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then(data => {
        console.log("Car fetched:", data); // Debug log
        setCar(data);
      })
      .catch(() => alert("Failed to load car details"))
      .finally(() => setLoading(false));
  }, [carId]);

  const handleBooking = () => {
    if (!car?.is_available) {
      alert("Car is not available for booking.");
      return;
    }

    const bookingData = {
      carId: car._id,
      model: car.model,
      brand: car.brand,
      price: car.price,
      renterName: "John Doe", // Ideally from user context
      date: new Date().toISOString().split("T")[0],
    };

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookingData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Booking failed");
        return res.json();
      })
      .then(() => alert("Booking successful!"))
      .catch(() => alert("Booking failed"));
  };

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        {car.model} - {car.brand}
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={car.image}
          alt={car.model}
          className="w-full md:w-1/2 h-auto rounded object-cover"
        />
        <div>
          <p><strong>Price Per Day:</strong> ${car.price}</p>
          <p><strong>Availability:</strong> {car.is_available ? "Available" : "Not Available"}</p>
          <p><strong>Features:</strong></p>
          <ul className="list-disc list-inside mb-4">
            {car.features?.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
          <p>{car.description}</p>

          {/* <p className="text-sm text-gray-500 mt-2">
            Debug: is_available = <strong>{String(car.is_available)}</strong>
          </p> */}

          <button
            onClick={handleBooking}
            // disabled={!car.is_available} // uncomment after verifying
            className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageCarDetails;



// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// const PageCarDetails = () => {
//   const { carId } = useParams();
//   const [car, setCar] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`http://localhost:5000/cars/${carId}`)
//       .then(res => {
//         if (!res.ok) throw new Error("Not found");
//         return res.json();
//       })
//       .then(data => setCar(data))
//       .catch(() => alert("Failed to load car details"))
//       .finally(() => setLoading(false));
//   }, [carId]);

//   const handleBooking = () => {
//     if (!car.is_available) return;

//     // এখানে renterName ডাইনামিক করতে পারো ইউজার লগইন ডেটা থেকে
//     const bookingData = {
//       carId: car._id,
//       model: car.model,
//       brand: car.brand,
//       price: car.price,
//       renterName: "John Doe",
//       date: new Date().toISOString().split("T")[0], // আজকের তারিখ
//     };

//     fetch("http://localhost:5000/bookings", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(bookingData),
//     })
//       .then(res => {
//         if (!res.ok) throw new Error("Booking failed");
//         return res.json();
//       })
//       .then(() => alert("Booking successful!"))
//       .catch(() => alert("Booking failed"));
//   };

//   if (loading) return <p>Loading...</p>;
//   if (!car) return <p>Car not found.</p>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-4">{car.model} - {car.brand}</h1>
//       <div className="flex flex-col md:flex-row gap-6">
//         <img src={car.image} alt={car.model} className="w-full md:w-1/2 h-auto rounded object-cover" />
//         <div>
//           <p><strong>Price Per Day:</strong> ${car.price}</p>
//           <p><strong>Availability:</strong> {car.is_available ? "Available" : "Not Available"}</p>
//           <p><strong>Features:</strong></p>
//           <ul className="list-disc list-inside mb-4">
//             {car.features?.map((f, i) => <li key={i}>{f}</li>)}
//           </ul>
//           <p>{car.description}</p>
//           <button
//             onClick={handleBooking}
//             disabled={!car.is_available}
//             className="mt-6 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//           >
//             Book Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageCarDetails;
