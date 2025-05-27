import { Link } from "react-router-dom";

const CarCard = ({ car }) => {
  return (
    <div className="card shadow-md rounded-lg">
      <img src={car.image} alt={car.model} className="h-40 w-full object-cover rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-lg font-semibold">{car.model} - {car.brand}</h2>
        <p>Location: {car.location}</p>
        <p>Price: ${car.price}</p>
        <Link to={`/cars/${car._id}`} className="btn btn-primary btn-sm mt-3">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
