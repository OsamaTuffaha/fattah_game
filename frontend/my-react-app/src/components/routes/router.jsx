import { createBrowserRouter } from "react-router-dom";
import Welcome from "../pages/welcome";
import Navbar from "../navbar";
import Main from "../layouts/Main";
import Login from "../pages/login";
import SignUp from "../pages/signup";
import Dashboard from "../pages/dashbord";
import Home from "../pages/home";
import AddCategory from "../pages/addcategory";
import AddQuestion from "../pages/addquestion";
import GameSetup from "../pages/categoryselect";
import GamePage from "../pages/gamepage";

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
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/addcategory",
        element: <AddCategory />,
      },
      {
        path: "/addquestions",
        element: <AddQuestion />,
      },
      {
        path: "/gamesetup",
        element: <GameSetup />,
      },
    ],
  },
  {
    path: "/gamepage",
    element: <GamePage />,
  },
]);

export default router;
