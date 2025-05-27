import { Link } from "react-router-dom";

const CarListItem = ({ car }) => {
  return (
    <div className="flex items-center p-4 border rounded-md shadow-sm gap-4">
      <img src={car.image} alt={car.model} className="w-32 h-24 object-cover rounded" />
      <div className="flex-1">
        <h2 className="font-bold">{car.model} - {car.brand}</h2>
        <p>Location: {car.location}</p>
        <p>Price: ${car.price}</p>
      </div>
      <Link to={`/cars/${car._id}`} className="btn btn-primary btn-sm">
        Book Now
      </Link>
    </div>
  );
};

export default CarListItem;
