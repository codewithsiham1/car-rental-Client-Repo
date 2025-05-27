import React from 'react';
import image from"../../src/assets/image/logo-w.svg"
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
const Footer = () => {
    return (
        
           <footer className='bg-gray-900 text-white py-10 mt-10'>
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
         {/* logo name */}
                 <div className="flex items-center space-x-3">
          <img src={image} alt="Logo" className="h-10" />
          <h1 className="text-2xl font-bold text-indigo-400">Car Rental</h1>
        </div>
        {/* navigation link */}
                <div className="flex justify-center space-x-6 text-gray-300">
          <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
          <Link to="/available-cars" className="hover:text-indigo-400 transition">Available Cars</Link>
          <Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link>
        </div>
        {/* social icons */}
          <div className="flex justify-center md:justify-end space-x-4">
          <a href="#" className="hover:text-indigo-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-indigo-400 transition"><FaTwitter /></a>
          <a href="#" className="hover:text-indigo-400 transition"><FaInstagram /></a>
        </div>
         </div>
         {/* bottom copy */}
           <div className="text-center text-sm text-gray-400 mt-8">
        © {new Date().getFullYear()} Car Rental. All rights reserved.
      </div>
           </footer>
    );
};

export default Footer;