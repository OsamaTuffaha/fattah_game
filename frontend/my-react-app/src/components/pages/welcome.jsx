import { Navigate, useNavigate } from "react-router-dom";
import MIND from "../../assets/MIND.png";

function Welcome() {
  const nav = useNavigate();
  return (
   <div className="min-h-[100dvh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FCC6BB] via-[#FDE2DF] to-[#FFF5F3]">
  
  <div className="text-center flex flex-col items-center justify-center gap-4 px-4">

    {/* LOGO */}
    <img
      src={MIND}
      alt="logo"
      className="h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh] w-auto object-contain"
    />

    {/* TEXT */}
    <p className="text-base sm:text-lg md:text-xl text-gray-700">
      اختبر ذكاءك وابدأ التحدي 🔥
    </p>

    {/* BUTTON */}
    <button
      onClick={() => {
        nav("/Home");
      }}
      className="
        mt-4 px-6 py-3
        bg-gray-900 text-white
        rounded-xl shadow-lg
        hover:scale-105 active:scale-95
        transition
      "
    >
      ابدأ اللعب 🎮
    </button>

  </div>
</div>
  );
}

export default Welcome;
