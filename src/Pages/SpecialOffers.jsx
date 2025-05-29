import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const SpecialOffers = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const offers = [
    {
      title: "Get 15% Off!",
      description: "Enjoy 15% off on all weekend rentals. Limited time only!",
      buttonText: "Book Now",
      bgColor: "bg-yellow-100",
      icon: "🔥",
    },
    {
      title: "Holiday Deal!",
      description: "Luxury cars starting at just $99/day this holiday season.",
      buttonText: "Learn More",
      bgColor: "bg-blue-100",
      icon: "🎁",
    },
    {
      title: "Free Upgrade!",
      description: "Book for 3 days and get a free car upgrade!",
      buttonText: "Book Now",
      bgColor: "bg-green-100",
      icon: "🚗",
    },
  ];

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-10" data-aos="fade-up">
          Special <span className="text-red-600">Offers</span>
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((offer, index) => (
            <div
              key={index}
              className={`${offer.bgColor} p-6 rounded-xl shadow-md transform transition duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center`}
              data-aos="fade-right"
              data-aos-delay={index * 200}
            >
              <div className="text-5xl mb-4">{offer.icon}</div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-700 mb-6 text-center">{offer.description}</p>
              <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition w-full sm:w-auto">
                {offer.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
