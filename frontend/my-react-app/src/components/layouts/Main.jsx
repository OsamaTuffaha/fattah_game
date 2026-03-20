import { Outlet } from "react-router-dom";
import Navbar from "../navbar";

function Main() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Main;
