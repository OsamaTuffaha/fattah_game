import { Navigate, useNavigate } from "react-router-dom";

function Welcome() {
  const nav = useNavigate();
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#FCC6BB] via-[#FDE2DF] to-[#FFF5F3]">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-800 tracking-wide">
          فَتِّح مُخَّك
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          اختبر ذكاءك وابدأ التحدي 🔥
        </p>

        <button
          onClick={() => {
            nav("/Home");
          }}
          className="mt-8 px-6 py-3 bg-gray-900 text-white rounded-xl shadow-lg hover:scale-105 transition"
        >
          ابدأ اللعب 🎮
        </button>
      </div>
    </div>
  );
}

export default Welcome;
