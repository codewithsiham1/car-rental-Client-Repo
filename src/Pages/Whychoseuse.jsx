import { FaCarSide, FaTags, FaMousePointer, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaCarSide className="text-5xl sm:text-4xl text-blue-600 mx-auto" />,
    title: 'Wide Variety of Cars',
    description: 'From budget-friendly rides to premium luxury vehicles.',
  },
  {
    icon: <FaTags className="text-5xl sm:text-4xl text-green-600 mx-auto" />,
    title: 'Affordable Prices',
    description: 'Enjoy competitive daily rates you can count on.',
  },
  {
    icon: <FaMousePointer className="text-5xl sm:text-4xl text-purple-600 mx-auto" />,
    title: 'Easy Booking Process',
    description: 'Book your car in just a few clicks.',
  },
  {
    icon: <FaHeadset className="text-5xl sm:text-4xl text-red-600 mx-auto" />,
    title: '24/7 Customer Support',
    description: 'We’re here for you anytime, anywhere.',
  },
];

const Whychoseuse = () => {
  return (
    <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl sm:text-4xl font-bold mb-10">Why Choose Us?</h2>
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-3">{feature.title}</h3>
            <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Whychoseuse;
