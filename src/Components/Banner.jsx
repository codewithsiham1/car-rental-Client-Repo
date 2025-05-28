import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "/src/assets/image/pexels-koprivakart-3354648.jpg",
    heading: "Drive Your Dreams Today!",
  },
  {
    image: "/src/assets/image/pexels-nordic-overdrive-202768-1082655.jpg",
    heading: "Your Next Car Awaits You",
  },
  {
    image: "/src/assets/image/pexels-pixabay-210143.jpg",
    heading: "Luxury Meets Affordability",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div
        className="relative h-[70vh] md:h-[80vh] bg-cover bg-center transition-all duration-1000"
        style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white text-center px-6 md:px-12">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg animate-fade-in max-w-4xl">
            {slides[currentSlide].heading}
          </h1>
          <Link
            to="/available-cars"
            className="bg-red-500 hover:bg-red-600 transition text-white font-semibold px-6 py-3 rounded-lg shadow-lg text-lg"
          >
            View Available Cars
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
