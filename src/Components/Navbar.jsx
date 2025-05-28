import React, { useContext, useState } from "react";
import image from "../../src/assets/image/logo-w.svg";
import { Link } from "react-router-dom";
import Authcontext from "../Context/Authcontext";

const Navbar = () => {
  const { user, signout } = useContext(Authcontext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  // Close mobile menu on link click (optional)
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="h-10" src={image} alt="Logo" />
          <Link to="/" className="text-2xl font-extrabold text-indigo-600">
            Car Rental
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center space-x-6 font-semibold text-gray-700">
          <li className="hover:text-indigo-600 transition">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-indigo-600 transition">
            <Link to="/available-cars">Available Cars</Link>
          </li>

          {user ? (
            <>
              <li className="hover:text-indigo-600 transition">
                <Link to="/addcar-page">Add Car</Link>
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

        {/* Mobile Hamburger Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
            className="focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                // Close icon (X)
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col space-y-3 px-4 py-4 font-semibold text-gray-700">
            <li>
              <Link to="/" onClick={closeMobileMenu} className="block hover:text-indigo-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/available-cars"
                onClick={closeMobileMenu}
                className="block hover:text-indigo-600 transition"
              >
                Available Cars
              </Link>
            </li>

            {user ? (
              <>
                <li>
                  <Link
                    to="/addcar-page"
                    onClick={closeMobileMenu}
                    className="block hover:text-indigo-600 transition"
                  >
                    Add Car
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-cars"
                    onClick={closeMobileMenu}
                    className="block hover:text-indigo-600 transition"
                  >
                    My Cars
                  </Link>
                </li>
                <li>
                  <Link
                    to="/my-booking"
                    onClick={closeMobileMenu}
                    className="block hover:text-indigo-600 transition"
                  >
                    My Bookings
                  </Link>
                </li>

                <li className="flex items-center space-x-3 pt-3 border-t border-gray-300">
                  <img
                    src={user.photoURL || "https://i.ibb.co/yV4QY8F/user.png"}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500"
                    title={user.displayName || user.email}
                  />
                  <span>{user.displayName || user.email}</span>
                </li>

                <li>
                  <button
                    onClick={() => {
                      signout();
                      closeMobileMenu();
                    }}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  to="/sign-in"
                  onClick={closeMobileMenu}
                  className="block bg-indigo-600 text-white px-5 py-2 rounded-full text-center hover:bg-indigo-700 transition"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

