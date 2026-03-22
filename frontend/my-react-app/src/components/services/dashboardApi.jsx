import axios from "axios";

export const getUsers = async () => {
  const result = await axios.get("http://localhost:5000/user");
  return result.data.users;
};

export const updateUser = async (id, user_name, email, phone_number) => {
  const result = await axios.put(`http://localhost:5000/user/update/${id}`, {
    user_name,
    email,
    phone_number,
  });
  return result.data;
};

export const deleteUser = async (id) => {
  const result = await axios.put(`http://localhost:5000/user/${id}`);
  return result.data;
};

export const addCategory = async (cat_name, image) => {
  const formData = new FormData();

  formData.append("cat_name", cat_name);
  formData.append("image", image);

  const result = await axios.post(
    "http://localhost:5000/category/add",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return result.data;
};

export const getCategory = async () => {
  const result = await axios.get("http://localhost:5000/category");
  return result.data;
};

export const addQuestion = async (data) => {
  return await axios.post("http://localhost:5000/question/add", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getQuestionsByCategory = async (id) => {
  const res = await axios.get(`http://localhost:5000/question/category/${id}`);
  return res.data.data;
};

export const deleteQuestion = async (id) => {
  await axios.delete(`http://localhost:5000/question/${id}`);
};
