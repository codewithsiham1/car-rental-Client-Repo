import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden transition-transform transform hover:scale-105">
      <img
        src={car.image}
        alt={car.model}
        className="h-48 w-full object-cover"
      />
      <div className="p-4 flex flex-col justify-between">
        <h2 className="text-xl font-semibold mb-1">
          {car.model} - {car.brand}
        </h2>
        <p className="text-gray-600 text-sm">Location: {car.location}</p>
        <p className="text-gray-600 text-sm mb-3">Price: ${car.price}</p>
        <Link
          to={`/cars/${car._id}`}
          className="inline-block text-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200 text-sm"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default CarCard;

