import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SortToggle from "./SortToggle";
import ViewToggle from "./ViewToggle";
import CarCard from "./CarCard";
import CarListItem from "./CarListItem";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [viewType, setViewType] = useState("grid");

  useEffect(() => {
    fetch("http://localhost:5000/cars") // adjust endpoint if needed
      .then((res) => res.json())
      .then((data) => setCars(data))
      .catch(() => alert("Failed to load cars"));
  }, []);

  const filteredCars = cars
    .filter((car) =>
      [car.model, car.brand, car.location]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.dateAdded) - new Date(a.dateAdded);
      if (sortBy === "oldest") return new Date(a.dateAdded) - new Date(b.dateAdded);
      if (sortBy === "price_low") return a.price - b.price;
      if (sortBy === "price_high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
        <SearchBar onSearch={setSearchTerm} />
        <SortToggle onSortChange={setSortBy} />
        <ViewToggle viewType={viewType} setViewType={setViewType} />
      </div>

      {filteredCars.length === 0 ? (
        <p>No cars found.</p>
      ) : (
        <div className={viewType === "grid" ? "grid grid-cols-1 md:grid-cols-3 gap-4" : "space-y-4"}>
          {filteredCars.map((car) =>
            viewType === "grid" ? (
              <CarCard key={car._id} car={car} />
            ) : (
              <CarListItem key={car._id} car={car} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AvailableCars;
