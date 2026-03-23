import React from "react";
import cardImage from "../../assets/cardImage.png";

const Home = () => {
  const gameName = "فتح مُخّك";

  return (
    <div className="
      min-h-screen 
      flex items-center justify-center 
      bg-gradient-to-br from-[#0f0c29] via-[#1f1b3a] to-[#24243e] 
      p-4
    ">

      {/* CARD */}
      <div className="
        w-full 
        max-w-sm 
        sm:max-w-md 
        md:max-w-2xl 
        lg:max-w-4xl

        bg-white/10 backdrop-blur-xl 
        border border-white/10 
        rounded-2xl shadow-2xl 
        overflow-hidden

        transition duration-300 hover:scale-[1.02]

        flex flex-col 
        md:flex-row   /* 🔥 Landscape & Desktop */
      ">

        {/* IMAGE */}
        <div className="w-full md:w-1/2">
          <a href="/game">
            <img
              className="
                w-full 
                h-48 
                sm:h-56 
                md:h-full 
                object-cover
              "
              src={cardImage}
              alt="game"
            />
          </a>
        </div>

        {/* CONTENT */}
        <div className="
          w-full md:w-1/2 
          p-4 sm:p-6 
          text-center md:text-right 
          flex flex-col justify-center
        ">

          {/* TAG */}
         
          {/* TITLE */}
          <h2 className="
            text-xl sm:text-2xl md:text-3xl 
            font-bold 
            text-white 
            mb-3
          ">
            {gameName}
          </h2>

          {/* DESCRIPTION */}
          <p className="
            text-gray-300 
            text-sm sm:text-base 
            mb-5 
            leading-relaxed
          ">
            لعبة تحدي وذكاء جماعية
            جاوب على مجموعة أسئلة وكل سؤال إله نقاط  
            كل ما تجاوب صح أكثر بتجمع نقاط أعلى  
            هل أنت جاهز تثبت نفسك
          </p>

          {/* BUTTON */}
          <a
            href="/gamesetup"
            className="
              inline-block 
              bg-gradient-to-r from-[#38598b] to-[#113f67] 
              text-white font-medium 
              px-6 py-2 
              rounded-lg shadow 
              hover:opacity-90 
              transition
            "
          >
            ابدأ اللعب
          </a>

        </div>
      </div>
    </div>
  );
};

export default Home;