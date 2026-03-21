import { createBrowserRouter } from "react-router-dom";

import Welcome from "../pages/welcome";

import Navbar from "../navbar";

import Main from "../layouts/Main";

import Login from "../pages/login";

import SignUp from "../pages/signup";

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
    ],
  },
]);

export default router;
