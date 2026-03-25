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
  const [answerImage, setAnswerImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [video, setVideo] = useState(null);
  const [answerVideo, setAnswerVideo] = useState(null);
  const [answerAudio, setAnswerAudio] = useState(null); 

  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [activeCat, setActiveCat] = useState(null);

  useEffect(() => {
    fetchCategories();
    
  }, []);

  const fetchCategories = async () => {
    const res = await getCategory();
    setCategories(res.data);
  };

  const handleSubmit = async () => {
    if (!form.category_id) {
      alert("اختار كاتيجوري أول");
      return;
    }

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    if (image) formData.append("image", image);
    if (answerImage) formData.append("answer_image", answerImage);
    if (audio) formData.append("audio", audio);
    if (video) formData.append("video", video);
    if (answerVideo) formData.append("answer_video", answerVideo);
    if (answerAudio) formData.append("answer_audio", answerAudio);

    await addQuestion(formData);

    setForm({
      question_text: "",
      answer: "",
      points: "",
      category_id: "",
    });

    setImage(null);
    setAnswerImage(null);
    setAudio(null);
    setVideo(null);
    setAnswerVideo(null);
    setAnswerAudio(null);

    if (activeCat) handleCategoryClick(activeCat);
  };

  const handleCategoryClick = async (id) => {
    setActiveCat(id);
    setForm({ ...form, category_id: id });

    const data = await getQuestionsByCategory(id);
    setQuestions(data);
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      {/* 🧠 FORM */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl max-w-md mx-auto mb-10">
        <h2 className="text-2xl font-bold mb-4 text-center">إضافة سؤال</h2>

        <input
          placeholder="السؤال"
          value={form.question_text}
          onChange={(e) => setForm({ ...form, question_text: e.target.value })}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        <input
          placeholder="الإجابة"
          value={form.answer}
          onChange={(e) => setForm({ ...form, answer: e.target.value })}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        <input
          placeholder="النقاط"
          type="number"
          value={form.points}
          onChange={(e) => setForm({ ...form, points: e.target.value })}
          className="w-full p-2 mb-3 rounded bg-white/20"
        />

        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="w-full p-2 mb-3 rounded-lg bg-black"
        >
          <option value="">اختر كاتيجوري</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.cat_name}
            </option>
          ))}
        </select>

        {/* باقي الفورم (صور / صوت / فيديو) زي ما هو عندك بدون تغيير */}
        {/* 📸 IMAGE */}
        <div
          onDrop={(e) => {
            e.preventDefault();
            setImage(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-white/30 p-4 rounded-xl text-center mb-3 cursor-pointer"
        >
          <p>صورة السؤال</p>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              className="h-24 mx-auto rounded"
            />
          ) : (
            <p>اسحب صورة السؤال أو اضغط</p>
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            id="imageUpload"
          />
          <label
            htmlFor="imageUpload"
            className="block mt-2 cursor-pointer text-purple-300"
          >
            اختر صورة
          </label>
        </div>

        {/* 🧠 ANSWER IMAGE */}
        <div
          onDrop={(e) => {
            e.preventDefault();
            setAnswerImage(e.dataTransfer.files[0]);
          }}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-white/30 p-4 rounded-xl text-center mb-3 cursor-pointer"
        >
          <p>صورة الجواب</p>

          {answerImage ? (
            <img
              src={URL.createObjectURL(answerImage)}
              className="h-24 mx-auto rounded"
            />
          ) : (
            <p>اسحب صورة الإجابة أو اضغط</p>
          )}

          <input
            type="file"
            onChange={(e) => setAnswerImage(e.target.files[0])}
            className="hidden"
            id="answerUpload"
          />
          <label
            htmlFor="answerUpload"
            className="block mt-2 cursor-pointer text-purple-300"
          >
            اختر صورة الإجابة
          </label>
        </div>

        {/* 🎧 AUDIO */}
        <div className="border-2 border-dashed border-white/30 p-4 rounded-xl text-center mb-3">
          <p>ملف صوت (اختياري)</p>

          {audio && (
            <audio controls className="mx-auto mt-2">
              <source src={URL.createObjectURL(audio)} />
            </audio>
          )}

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files[0])}
            className="hidden"
            id="audioUpload"
          />
          <label
            htmlFor="audioUpload"
            className="block mt-2 cursor-pointer text-purple-300"
          >
            اختر صوت
          </label>
        </div>

        {/* 🎧 ANSWER AUDIO */}
        <div className="border-2 border-dashed border-white/30 p-4 rounded-xl text-center mb-3">
          <p>صوت الجواب</p>

          {answerAudio && (
            <audio controls className="mx-auto mt-2">
              <source src={URL.createObjectURL(answerAudio)} />
            </audio>
          )}

          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setAnswerAudio(e.target.files[0])}
            className="hidden"
            id="answerAudioUpload"
          />
          <label
            htmlFor="answerAudioUpload"
            className="block mt-2 cursor-pointer text-purple-300"
          >
            اختر صوت الجواب
          </label>
        </div>

        {/* 🎥 VIDEO */}
        <div className="border-2 border-dashed border-white/30 p-4 rounded-xl text-center mb-3">
          <p>فيديو السؤال</p>

          {video && (
            <video controls className="h-24 mx-auto mt-2 rounded">
              <source src={URL.createObjectURL(video)} />
            </video>
          )}

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            className="hidden"
            id="videoUpload"
          />
          <label
            htmlFor="videoUpload"
            className="block mt-2 cursor-pointer text-purple-300"
          >
            اختر فيديو
          </label>
        </div>

        {/* 🎥 ANSWER VIDEO */}
        <div className="border-2 border-dashed border-white/30 p-4 rounded-xl text-center mb-3">
          <p>فيديو الجواب</p>

          {answerVideo && (
            <video controls className="h-24 mx-auto mt-2 rounded">
              <source src={URL.createObjectURL(answerVideo)} />
            </video>
          )}

          <input
            type="file"
            accept="video/*"
            onChange={(e) => setAnswerVideo(e.target.files[0])}
            className="hidden"
            id="answerVideoUpload"
          />
          <label
            htmlFor="answerVideoUpload"
            className="block mt-2 cursor-pointer text-purple-300"
          >
            اختر فيديو الجواب
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-purple-600 py-2 rounded hover:bg-purple-700"
        >
          إضافة
        </button>
      </div>

      {/* 📦 CATEGORY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.id)}
            className={`cursor-pointer p-3 rounded-xl text-center
              ${
                activeCat === cat.id
                  ? "bg-purple-600"
                  : "bg-white/10 hover:bg-white/20"
              }
            `}
          >
            <img
              src={cat.image}
              className="h-20 w-20 object-cover mx-auto mb-2 rounded-lg"
            />
            <p>{cat.cat_name}</p>
          </div>
        ))}
      </div>

      {/* 📋 QUESTIONS */}
      <div className="max-w-3xl mx-auto space-y-3">
        {questions.map((q) => (
          <div
            key={q.id}
            className="bg-white/10 p-4 rounded-xl flex justify-between"
          >
            <div>
              <p className="font-bold">السؤال : {q.question_text}</p>
              <p>الجواب : {q.answer}</p>
              <p>النقاط : {q.points}</p>

              {/* 🔥 عرض واحد فقط للسؤال */}
              {q.image ? (
                <img src={q.image} className="w-20 mt-2 rounded" />
              ) : q.audio ? (
                <audio controls className="mt-2">
                  <source src={q.audio} />
                </audio>
              ) : q.video ? (
                <video controls className="w-32 mt-2 rounded">
                  <source src={q.video} />
                </video>
              ) : null}

              {/* 🔥 عرض واحد فقط للجواب */}
              {q.answer_image ? (
                <img src={q.answer_image} className="w-16 mt-2 rounded" />
              ) : q.answer_audio ? (
                <audio controls className="mt-2">
                  <source src={q.answer_audio} />
                </audio>
              ) : q.answer_video ? (
                <video controls className="w-32 mt-2 rounded">
                  <source src={q.answer_video} />
                </video>
              ) : null}
            </div>

            <button
              onClick={() => handleDelete(q.id)}
              className="bg-red-500 px-3 py-1 rounded"
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
