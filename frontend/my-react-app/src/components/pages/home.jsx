import React from "react";
import cardImage from "../../assets/cardImage.png"; // عدل المسار حسب مشروعك

const Home = () => {
  const gameName = "فتح مُخّك";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#38598b] via-[#a2a8d3] to-[#113f67] p-4">
      
      <div className="w-full max-w-sm bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
        
        <a href="/game">
          <img
            className="w-full h-100 object-cover"
            src={cardImage}
            alt="game"
          />
        </a>

        <div className="p-6 text-center">
          
          <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            🔥 الأكثر لعباً
          </span>

          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            {gameName}
          </h2>

          <p className="text-gray-600 text-sm mb-5 leading-relaxed">
            لعبة تحدي وذكاء!   
            جاوب على مجموعة أسئلة، وكل سؤال إله نقاط.  
            كل ما تجاوب صح أكثر، بتجمع نقاط أعلى!  
            هل أنت جاهز تثبت إنك أذكى من أصحابك؟ 
          </p>

          <a
            href="/gamesetup"
            className="inline-block bg-gradient-to-r from-[#38598b] to-[#113f67] text-white font-medium px-6 py-2 rounded-lg shadow hover:opacity-90 transition"
          >
            ابدأ اللعب 
          </a>

        </div>
      </div>
    </div>
  );
};

export default Home;