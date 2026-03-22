import axios from "axios";

export const getUsers = async () => {
  const result = await axios.get("http://localhost:5000/user");
  return result.data.users;
};

export const updateUser = async (id, user_name, email, phone_number) => {
  const result = await axios.put(
    `http://localhost:5000/user/update/${id}`,
    {
      user_name,
      email,
      phone_number,
    }
  );
  return result.data;
};

export const deleteUser = async (id) => {
  const result = await axios.put(
    `http://localhost:5000/user/${id}`
  );
  return result.data;
};