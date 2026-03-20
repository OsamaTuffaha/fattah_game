import { createBrowserRouter } from "react-router-dom";

import Welcome from "../pages/welcome";

import Navbar from "../navbar";

import Main from "../layouts/Main";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "",
        element: <Welcome />,
      },
    ],
  },
]);

export default router;
