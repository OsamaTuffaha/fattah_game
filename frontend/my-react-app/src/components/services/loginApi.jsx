import axios from "axios";

export const loginApi = async (email, password) => {
  const result = await axios.post("http://localhost:5000/user/login", {
    email,
    password,
  });

  return result.data;
};
