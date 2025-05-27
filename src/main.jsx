// main.jsx

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 800 }); // ✅ এটা সরাসরি call করা যাবে

import { RouterProvider } from 'react-router-dom'
import Router from './Route/Router.jsx'
import Authprovider from './Context/Authprovider.jsx';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
      <RouterProvider router={Router}></RouterProvider>
      <ToastContainer></ToastContainer>
    </Authprovider>
  </StrictMode>,
)
