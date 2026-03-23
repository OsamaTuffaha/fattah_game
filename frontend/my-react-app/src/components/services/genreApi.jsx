import axios from "axios";

export const getGenre = async () => {
  const result = await axios.get("http://localhost:5000/category/genre");
  return result.data;
};
