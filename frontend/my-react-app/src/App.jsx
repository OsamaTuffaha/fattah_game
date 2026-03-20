import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Navbar from "./components/navbar";
// import Dashboard from "./components/pages/dashbord";
import Welcome from "./components/pages/welcome";
import { RouterProvider } from "react-router-dom";
import router from "./components/routes/router";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
