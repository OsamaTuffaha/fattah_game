import { data, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserId } from "../features/auth/authSlice";
import { loginApi } from "../services/loginApi";
import icon from "../../assets/icon.png";
import MIND from "../../assets/MIND.png"
import "./login.css";

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
      setMessage(data.message);

      // خزّن البيانات
      dispatch(setToken(data.token));
      dispatch(setUserId(data.id));

      setTimeout(() => {
        navigate("/");
      }, 2000);

      // روح على الصفحة الرئيسية
    } catch (error) {
      console.log("ERROR:", error.response?.data);
      setMessage(error.response?.data?.message || error.message);
    }
  };

  // 🔥 إذا مسجل دخول، رجّعه
  // if (auth.isLoggedIn) {
  //   return <Navigate to="/" />;
  // }

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-r from-[#C08552] to-[#8C5A3C] login-wrapper ">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 login-card">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={MIND} alt="logo" className="mx-auto h-80 mb-4 login-logo" />

          <h2  className=" text-center text-2xl font-bold text-white login-title">
            تسجيل الدخول
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleLogin} className="space-y-6 login-form">
            {/* EMAIL */}
            <div>
              <label className="block text-sm font-medium text-gray-100">
                Email address
              </label>
              <input
                type="email"
                required
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white login-input"
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
                className="block w-full rounded-md bg-white/5 px-3 py-2 text-white login-input"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-white hover:bg-indigo-400 login-button"
            >
              Sign in
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-white">
            ما عندك حساب؟{" "}
            <a
              onClick={() => {
                navigate("/signup");
              }}
              className="font-semibold text-green-400 hover:text-green-300"
            >
              سجل الان
            </a>
          </p>
          <p className="mt-10 text-center text-sm text-white">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
