import { setLogout } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = localStorage.getItem('userId')
  const dashButton = () =>{
    if (isLoggedIn && userId == 1){
      return <>Admin Dashboard</>
    }
  }
  return (
    <div className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">فَتِّح مُخَّك</h1>

      <div className="space-x-4">
        <a href="/home" className="hover:text-gray-300">
          {isLoggedIn ? "Home" : null}
        </a>
        <a
          onClick={() => {
            if (isLoggedIn) {
              dispatch(setLogout());
            }
          }}
          href="login"
          className="hover:text-gray-300"
        >
          {isLoggedIn ? "Logout" : "Login"}
        </a>
        <a href="/dashboard" className="hover:text-gray-300">
          {dashButton()}
        </a>
      </div>
    </div>
  );
}

export default Navbar;
