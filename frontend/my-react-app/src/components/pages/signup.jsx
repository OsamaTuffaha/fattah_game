import { useDispatch, useSelector } from "react-redux";
import signupApi from "../services/signupApi";
import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const data = await signupApi(userName, email, phoneNumber, password);

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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Name</label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">
              Phone number
            </label>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
