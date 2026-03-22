import { useEffect, useState } from "react";
import {
  addQuestion,
  getQuestionsByCategory,
  deleteQuestion,
  getCategory,
} from "../services/dashboardApi";

const AddQuestion = () => {
  const [form, setForm] = useState({
    question_text: "",
    answer: "",
    points: "",
    category_id: "",
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getCategory();
    setCategories(res.data);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) formData.append("image", image);

    await addQuestion(formData);

    setForm({
      question_text: "",
      answer: "",
      points: "",
      category_id: "",
    });

    setImage(null);
  };

  const handleCategoryClick = async (id) => {
    const data = await getQuestionsByCategory(id);
    setQuestions(data);
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-md mx-auto mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ➕ إضافة سؤال
        </h2>

        <input
          placeholder="السؤال"
          value={form.question_text}
          onChange={(e) =>
            setForm({ ...form, question_text: e.target.value })
          }
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        <input
          placeholder="الإجابة"
          value={form.answer}
          onChange={(e) =>
            setForm({ ...form, answer: e.target.value })
          }
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        <input
          placeholder="النقاط"
          type="number"
          value={form.points}
          onChange={(e) =>
            setForm({ ...form, points: e.target.value })
          }
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        <select
          value={form.category_id}
          onChange={(e) =>
            setForm({ ...form, category_id: e.target.value })
          }
          className="w-full p-2 mb-3 rounded bg-white/20"
        >
          <option value="">اختر كاتيجوري</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.cat_name}
            </option>
          ))}
        </select>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed p-4 text-center rounded mb-3 cursor-pointer"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="h-24 w-24 object-cover mx-auto rounded"
            />
          ) : (
            <p>اسحب الصورة أو اضغط للاختيار 📁</p>
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            id="upload"
          />
          <label htmlFor="upload" className="block mt-2 cursor-pointer text-blue-300">
            اختر صورة
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
        >
          إضافة 
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className="cursor-pointer bg-white/10 p-3 rounded-xl text-center hover:scale-105 transition"
          >
            <img
              src={cat.image}
              className="h-20 w-20 object-cover mx-auto mb-2 rounded"
            />
            <p>{cat.cat_name}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white/10 p-4 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              
              <img
                src={q.image}
                className="w-16 h-16 object-cover rounded-lg"
              />

              <div>
                <p className="font-bold">{q.question_text}</p>
                <p className="text-sm text-gray-300">
                  {q.answer}
                </p>
                <p className="text-yellow-300 text-sm">
                  {q.points} نقطة
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDelete(q.id)}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AddQuestion;