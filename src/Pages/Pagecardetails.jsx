import { useState, useEffect } from "react";

const Pagecardetails = () => {
      const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/cars/${carId}`) // Adjust your endpoint here
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching car details:", err);
        setLoading(false);
      });
  }, [carId]);

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found.</p>;

  const {
    model,
    price,
    is_available,
    features = [],
    images = [],
    description,
  } = car;

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const confirmBooking = () => {
    alert(`Booking confirmed for ${model}!`);
    closeModal();
  };

    return (
        <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{model}</h1>

      {/* Images carousel / gallery */}
      <div className="flex space-x-4 overflow-x-auto mb-6">
        {images.length > 0 ? (
          images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${model} image ${i + 1}`}
              className="h-48 w-auto rounded-lg shadow-md"
            />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>

      {/* Details */}
      <div className="mb-6">
        <p className="text-xl font-semibold">Price Per Day: <span className="text-green-600">${price}</span></p>
        <p className="mb-2">
          Availability:{" "}
          <span className={is_available ? "text-green-600" : "text-red-600"}>
            {is_available ? "Available" : "Not Available"}
          </span>
        </p>

        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Features:</h3>
          {features.length > 0 ? (
            <ul className="list-disc list-inside">
              {features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          ) : (
            <p>No features listed.</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Description:</h3>
          <p>{description || "No description available."}</p>
        </div>
      </div>

      {/* Book Now button */}
      <button
        onClick={openModal}
        disabled={!is_available}
        className={`btn btn-primary ${!is_available && "btn-disabled cursor-not-allowed"}`}
      >
        Book Now
      </button>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>
            <p><strong>Model:</strong> {model}</p>
            <p><strong>Price Per Day:</strong> ${price}</p>
            <p><strong>Availability:</strong> {is_available ? "Available" : "Not Available"}</p>
            <p className="mt-4">Are you sure you want to book this car?</p>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="btn btn-primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
};

export default Pagecardetails;