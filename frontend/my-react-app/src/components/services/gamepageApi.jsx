import axios from "axios";

const BASE_URL = "http://localhost:5000/question";

// ➕ إضافة سؤال
export const addQuestion = async (formData) => {
  return await axios.post(`${BASE_URL}/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// 📥 كل الأسئلة
export const getQuestions = async () => {
  const res = await axios.get(`${BASE_URL}/`);
  return res.data.data;
};

// 📂 حسب الكاتيجوري
export const getQuestionsByCategory = async (id) => {
  const res = await axios.get(`${BASE_URL}/category/${id}`);
  return res.data.data;
};

// 🎮 جلب أسئلة اللعبة
export const getGameQuestions = async (userId, categoryIds) => {
  const res = await axios.post(`${BASE_URL}/game`, {
    userId,
    categoryIds,
  });
  return res.data.data;
};

// ✅ تسجيل السؤال إنه انلعب
export const markQuestionPlayed = async (userId, questionId) => {
  await axios.post(`${BASE_URL}/played`, {
    userId,
    questionId,
  });
};

// ❌ حذف سؤال
export const deleteQuestion = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};