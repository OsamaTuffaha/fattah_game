import {  Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserId } from "../features/auth/authSlice";
import { loginApi } from "../services/loginApi";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // 🔥 handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginApi(email, password);
      console.log("SUCCESS:", data);


      // خزّن البيانات
      dispatch(setToken(data.token));
      dispatch(setUserId(data.userId));

      // روح على الصفحة الرئيسية
      navigate("/");
    } catch (error) {
      console.log("ERROR:", error.response?.data);
    }
  };

  // 🔥 إذا مسجل دخول، رجّعه
  if (auth.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#38598b] via-[#a2a8d3] to-[#113f67]">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Email address
              </label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Password
              </label>
              <input
                type="password"
                required
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-400"
            >
              Sign in
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            Not a member?{" "}
            <a className="font-semibold text-green-400 hover:text-green-300">
              sign up now
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
