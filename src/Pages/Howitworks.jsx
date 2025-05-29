import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Howitworks = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const steps = [
    {
      step: "1",
      title: "Search Your Car",
      description: "Browse through our wide range of cars and find the one that suits your journey.",
      icon: "🔍",
    },
    {
      step: "2",
      title: "Book Instantly",
      description: "Select your dates, confirm availability, and book with just a few clicks.",
      icon: "📝",
    },
    {
      step: "3",
      title: "Pick Up & Drive",
      description: "Pick up the car at your chosen time and location. Drive with confidence!",
      icon: "🚗",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12" data-aos="fade-up">
          How It <span className="text-green-600">Works</span>
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 150}
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
              <div className="mt-4 text-sm text-gray-400">Step {step.step}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Howitworks;

