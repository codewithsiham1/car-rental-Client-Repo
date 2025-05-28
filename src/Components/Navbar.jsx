import React, { useContext } from 'react';
import image from "../../src/assets/image/logo-w.svg";
import { Link } from 'react-router-dom';
import Authcontext from '../Context/Authcontext';

const Navbar = () => {
  const { user, signout } = useContext(Authcontext);

  return (
    <nav className='bg-white shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center space-x-2'>
          <img className='h-10' src={image} alt="Logo" />
          <Link to="/" className='text-2xl font-extrabold text-indigo-600'>
            Car Rental
          </Link>
        </div>

        {/* Nav Links */}
        <ul className='hidden md:flex items-center space-x-6 font-semibold text-gray-700'>
          <li className='hover:text-indigo-600 transition'>
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-indigo-600 transition">
            <Link to="/available-cars">Available Cars</Link>
          </li>

          {user ? (
            <>
              <li className='hover:text-indigo-600 transition'>
                <Link to='/addcar-page'>Add Car</Link>
              </li>
              <li className="hover:text-indigo-600 transition">
                <Link to="/my-cars">My Cars</Link>
              </li>
              <li className="hover:text-indigo-600 transition">
                <Link to="/my-booking">My Bookings</Link>
              </li>

              {/* Profile Photo */}
              <li>
                <img
                  src={user.photoURL || "https://i.ibb.co/yV4QY8F/user.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                  title={user.displayName || user.email}
                />
              </li>

              {/* Logout Button */}
              <li>
                <button
                  onClick={signout}
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/sign-in"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
