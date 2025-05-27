import { FaCarSide, FaTags, FaMousePointer, FaHeadset } from 'react-icons/fa';
const features = [
  {
    icon: <FaCarSide className="text-4xl text-blue-600" />,
    title: 'Wide Variety of Cars',
    description: 'From budget-friendly rides to premium luxury vehicles.',
  },
  {
    icon: <FaTags className="text-4xl text-green-600" />,
    title: 'Affordable Prices',
    description: 'Enjoy competitive daily rates you can count on.',
  },
  {
    icon: <FaMousePointer className="text-4xl text-purple-600" />,
    title: 'Easy Booking Process',
    description: 'Book your car in just a few clicks.',
  },
  {
    icon: <FaHeadset className="text-4xl text-red-600" />,
    title: '24/7 Customer Support',
    description: 'We’re here for you anytime, anywhere.',
  },
];
const Whychoseuse = () => {
    return (
        <div>
             <section className="py-12 bg-gray-100 text-center">
      <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
        </div>
    );
};

export default Whychoseuse;