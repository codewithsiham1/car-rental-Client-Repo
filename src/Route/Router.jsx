import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home";
import Errorpage from "../Pages/Errorpage";
import Main from "../Layouts/Main";
import Addcar from "../Pages/Addcar";
import Signup from "../Pages/Signup/Signup";
import Signin from "../Pages/Signin/Signin";
import Availablecars from "../Pages/Availablecars";
import AddCarPage from "../Pages/AddCarPage";
import Privateroute from "./Privateroute";



import MyBookings from "../Pages/MyBookings ";
import UpdateCar from "../Pages/UpdateCar";
import Bookings from "../Pages/Bookings";
import Bookingform from "../Pages/Bookingform";
import MyCars from "../Pages/MyCars";




const Router=createBrowserRouter([
{
    path:"/",
    element:<Main></Main>,
    errorElement:<Errorpage></Errorpage>,
    children:[
        {
            path:"/",
            element:<Home></Home>
           
        },
        {
            path:"/addcar",
            element:<Addcar></Addcar>
        },
        {
            path:"/sign-up",
            element:<Signup></Signup>
        },
        {
            path:"/sign-in",
            element:<Signin></Signin>
        },
        {
            path:"/available-cars",
            element:<Availablecars></Availablecars>
        },
        {
            path:"/addcar-page",
            element:<Privateroute>
                <AddCarPage></AddCarPage>
            </Privateroute>
        },
      
       
        {
            path:"/my-booking",
            element:<Privateroute>
                <MyBookings></MyBookings>
            </Privateroute>
        },
        {
            path:"/update-car/:id",
            element:<UpdateCar></UpdateCar>
        },
        {
            path:"/bookings",
            element:<Bookings></Bookings>
        },
        {
        path:"/book/:carId",
        element:<Bookingform></Bookingform>
        },
        {
            path:"/my-cars",
            element:<MyCars></MyCars>
        }
      
    ]
}
])
export default Router;