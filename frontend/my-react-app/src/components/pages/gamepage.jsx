import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGameQuestions } from "../services/gamepageApi";

const GamePage = () => {
  const location = useLocation();

  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        No Game Data
      </div>
    );
  }

  const { selectedCats, team1, team2 } = location.state;

  const [gameData, setGameData] = useState({});

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    const data = await getGameQuestions(
      1,
      selectedCats.map((c) => c.id)
    );

    organizeData(data);
  };

  // 🧠 ترتيب حسب النقاط
  const organizeData = (questions) => {
    const grouped = {};

    questions.forEach((q) => {
      if (!grouped[q.category_id]) {
        grouped[q.category_id] = [];
      }
      grouped[q.category_id].push(q);
    });

    // 🔥 sort داخل كل كاتيجوري
    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => a.points - b.points);
    });

    setGameData(grouped);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      
      {/* teams */}
      <div className="flex justify-between max-w-6xl mx-auto mb-8 text-lg font-semibold">
        <span>{team1}</span>
        <span>{team2}</span>
      </div>

      {/* 🔥 grid 3 columns */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        
        {selectedCats.map((cat) => {
          const questions = gameData[cat.id] || [];

          return (
            <div
              key={cat.id}
              className="bg-white/10 p-4 rounded-xl flex items-center justify-between"
            >
              
              {/* 🔹 left */}
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
                  >
                    {questions[i]?.points || "-"}
                  </button>
                ))}
              </div>

              {/* 🔹 category */}
              <div className="text-center">
                <img
                  src={cat.image}
                  className="w-20 h-20 object-cover rounded-xl mx-auto mb-2"
                />
                <p className="text-sm">{cat.cat_name}</p>
              </div>

              {/* 🔹 right */}
              <div className="flex flex-col gap-3">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className="bg-purple-600 px-4 py-2 rounded hover:bg-purple-700"
                  >
                    {questions[i + 3]?.points || "-"}
                  </button>
                ))}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default GamePage;