import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Booking from "../pages/Booking/Booking";
import Contact from "../pages/ContactUs/ContactUs";
import Team from "../pages/Team/Team";
import AboutUs from "../pages/AboutUs/AboutUs";
import RequireAuth from "..//navigation/RequireAuth";
import BaseUser from "../navigation/BaseUser";
import AuthNav from "../navigation/AuthNav";
import RequireAdmin from "../navigation/RequireAdmin";
import RootLayout from "../navigation/RootLayout";
import LoginPage from "../features/auth/LoginPage";
import RegisterPagePatient from "../features/auth/PatientRegistration/RegisterPagePatient";
import RegisterPageDoctor from "../features/auth/DoctorRegistration/RegisterPageDoctor";
import PatientProfileCompletion from "../pages/Profiles/PatientProfileCompletion";
import PatientUser from "../navigation/PatientUser";
import Dashboard from "../pages/Dashboard/Dashboard";
import { element } from "prop-types";
import DoctorProfileCompletion from "../pages/Profiles/DoctorProfileCompletion";
import ProfileCompletion from "../pages/Profiles/ProfileCompletion";
const Router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        element: <AuthNav />,
        children: [
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/register_patient",
            element: <RegisterPagePatient />,
          },
          {
            path: "/register_doctor",
            element: <RegisterPageDoctor />,
          },
        ],
      },
      {
        element: <BaseUser />,
        children: [
          {
            index: "true",
            element: <Home />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "about",
            element: <AboutUs />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: <RequireAuth />,
        children: [
          {
            element: <PatientUser />,
            children: [
              {
                index: "true",
                element: <Dashboard />,
              },
              {
                path: "booking",
                element: <Booking />,
              },
              {
                path: "doctors",
                element: <Team />,
              },
              {
                path: "complete_profile",
                element: <ProfileCompletion />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/*",
    element: <>Not Found</>,
  },
]);

export default Router;
