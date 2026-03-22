import { createBrowserRouter } from "react-router-dom";

import Welcome from "../pages/welcome";

import Navbar from "../navbar";

import Main from "../layouts/Main";

import Login from "../pages/login";

import SignUp from "../pages/signup";

import Dashboard from "../pages/dashbord";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
