import axios from "axios";

const signupApi = async (user_name, email, phone_number, password) => {
  const result = await axios.post("http://localhost:5000/user/register", {
    user_name,
    email,
    phone_number,
    password,
  });
  return result.data;
};

export default signupApi;
