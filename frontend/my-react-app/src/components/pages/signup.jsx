import { useDispatch, useSelector } from "react-redux";
import signupApi from "../services/signupApi";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./signup.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [phoneCode, setPhoneCode] = useState("+962");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const fullPhone = phoneCode + phoneNumber;

    try {
      const data = await signupApi(userName, email, fullPhone, password);

      console.log("success", data);
      setMessage(data.message || "Account created successfully ✅");
      setSuccess(true);
      setTimeout(() => {
        nav("/login");
      }, 1000);
    } catch (error) {
      console.log("error", error);
      setMessage(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-gradient-to-r from-[#C08552] to-[#8C5A3C] padding">
      <div className="bg-gradient-to-r from-[#FFF8F0] to-[#FFF8F0] p-8 rounded-2xl shadow-md w-80 max-w-md ">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Phone number
            </label>

            <div className="flex gap-2">
              {/* COUNTRY CODE */}
              <select
                onChange={(e) => setPhoneCode(e.target.value)}
                className="px-3 py-2 border rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="+962">🇯🇴 +962</option>
                <option value="+966">🇸🇦 +966</option>
                <option value="+971">🇦🇪 +971</option>
                <option value="+20">🇪🇬 +20</option>
                <option value="+1">🇺🇸 +1</option>
              </select>

              {/* PHONE INPUT */}
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 w-10"
                placeholder="7XXXXXXXX"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Enter you password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
        <p className="text-sm text-center mt-4">{message}</p>
      </div>
    </div>
  );
};

export default SignUp;
