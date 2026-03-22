import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getGameQuestions } from "../services/gamepageApi";

const GamePage = () => {
  const location = useLocation();

  if (!location.state) {
    return <div className="text-white">No Game Data</div>;
  }

  const { selectedCats, team1, team2 } = location.state;

  const [gameData, setGameData] = useState({});
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

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

  const organizeData = (questions) => {
    const grouped = {};

    questions.forEach((q) => {
      if (!grouped[q.category_id]) {
        grouped[q.category_id] = [];
      }
      grouped[q.category_id].push(q);
    });

    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => a.points - b.points);
    });

    setGameData(grouped);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1f1b3a] to-[#24243e] text-white">
      
      {/* TITLE */}
      <div className="text-center text-xl font-bold py-4">
        فتح عقلك
      </div>

      {/* GRID */}
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {selectedCats.map((cat) => {
          const questions = gameData[cat.id] || [];

          return (
            <div
              key={cat.id}
              className="bg-white/5 rounded-2xl p-3 flex items-center justify-center gap-3 border border-white/10"
            >
              
              {/* LEFT */}
              <div className="flex flex-col gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className="bg-white/10 hover:bg-purple-600 transition px-4 py-1 rounded-full text-sm"
                  >
                    {questions[i]?.points || [200, 400, 600][i]}
                  </button>
                ))}
              </div>

              {/* CATEGORY */}
              <div className="text-center">
                <img
                  src={cat.image}
                  className="w-28 h-28 object-cover rounded-xl mx-auto"
                />
                <p className="text-xs mt-1">{cat.cat_name}</p>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-2">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    className="bg-white/10 hover:bg-purple-600 transition px-4 py-1 rounded-full text-sm"
                  >
                    {questions[i + 3]?.points || [200, 400, 600][i]}
                  </button>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* TEAMS */}
      <div className="fixed bottom-0 w-full bg-black/30 backdrop-blur-md p-4 flex justify-between border-t border-white/10">
        
        {/* TEAM 1 */}
        <div className="flex flex-col items-center w-1/2">
          <div className="text-sm mb-2">{team1}</div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setScore1(score1 - 100)}
              className="bg-purple-600 hover:bg-purple-700 w-8 h-8 rounded-full"
            >
              -
            </button>

            <div className="bg-white/10 px-6 py-1 rounded-xl text-lg font-bold">
              {score1}
            </div>

            <button
              onClick={() => setScore1(score1 + 100)}
              className="bg-purple-600 hover:bg-purple-700 w-8 h-8 rounded-full"
            >
              +
            </button>
          </div>
        </div>

        {/* TEAM 2 */}
        <div className="flex flex-col items-center w-1/2">
          <div className="text-sm mb-2">{team2}</div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setScore2(score2 - 100)}
              className="bg-purple-600 hover:bg-purple-700 w-8 h-8 rounded-full"
            >
              -
            </button>

            <div className="bg-white/10 px-6 py-1 rounded-xl text-lg font-bold">
              {score2}
            </div>

            <button
              onClick={() => setScore2(score2 + 100)}
              className="bg-purple-600 hover:bg-purple-700 w-8 h-8 rounded-full"
            >
              +
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default GamePage;