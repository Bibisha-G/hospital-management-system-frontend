import { createBrowserRouter } from "react-router-dom";
import Container from "../pages/Container/Container";
import Home from "../pages/Home/Home";
import Booking from "../pages/Booking/Booking";
import Contact from "../pages/ContactUs/ContactUs";
import Team from "../pages/Team/Team";
import AboutUs from "../pages/AboutUs/AboutUs";
const Router = createBrowserRouter([
    {
        path: "/",
        element: <Container />,
        children: [
            {
                path: "",
                element : <Home/>
            },
            {
                path: "booking",
                element: <Booking/>   
            },
            {
                path: "contact",
                element: <Contact/>,
            },
            {
                path: "doctors",
                element: <Team/>
            },
            {
                path: "about",
                element: <AboutUs/>
            }
        ]
    },
    {
        path: "/*",
        element: <>Not Found</>,
    },
]);
export default Router;