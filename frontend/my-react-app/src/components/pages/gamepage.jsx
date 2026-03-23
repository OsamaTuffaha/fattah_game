import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGameQuestions, markQuestionPlayed } from "../services/gamepageApi";

const GamePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <div className="text-white">No Game Data</div>;
  }

  const { selectedCats, team1, team2 } = location.state;

  const [gameData, setGameData] = useState({});
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [playedQuestions, setPlayedQuestions] = useState([]);

  const [currentQ, setCurrentQ] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [time, setTime] = useState(60);

  const [zoomImg, setZoomImg] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchGame();
  }, []);

  const fetchGame = async () => {
    const data = await getGameQuestions(
      userId,
      selectedCats.map((c) => c.id)
    );

    organizeData(data);
  };

  const organizeData = (questions) => {
    const grouped = {};
    questions.forEach((q) => {
      if (!grouped[q.category_id]) grouped[q.category_id] = [];
      grouped[q.category_id].push(q);
    });

    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => a.points - b.points);
    });

    setGameData(grouped);
  };

  // TIMER
  useEffect(() => {
    if (time > 0 && currentQ && !showAnswer) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, currentQ, showAnswer]);

  const handleAnswer = async (team) => {
    await markQuestionPlayed(userId, currentQ.id);

    setPlayedQuestions((prev) =>
      prev.includes(currentQ.id) ? prev : [...prev, currentQ.id]
    );

    if (team === team1) {
      setScore1((prev) => prev + currentQ.points);
    } else {
      setScore2((prev) => prev + currentQ.points);
    }

    handleClose();
    fetchGame();
  };

  const handleClose = () => {
    setCurrentQ(null);
    setShowAnswer(false);
    setTime(60);
  };

  // ✅ FIXED شرط النهاية
  const isGameFinished = Object.keys(gameData).length === 0;

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-br from-[#0f0c29] via-[#1f1b3a] to-[#24243e] text-white overflow-hidden">

      {/* HEADER */}
      <div className="flex justify-between items-center p-3">
        <button
          onClick={() => navigate("/")}
          className="bg-white/10 px-3 py-1 rounded-lg text-sm"
        >
          رجوع
        </button>
        <div className="font-bold">فتح عقلك</div>
        <div></div>
      </div>

      {/* GRID */}
      <div className="p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {selectedCats.map((cat) => {
          const questions = gameData[cat.id] || [];

          return (
            <div
              key={cat.id}
              className="bg-white/5 rounded-xl p-2 flex items-center justify-center gap-2"
            >
              {/* LEFT */}
              <div className="flex flex-col gap-1">
                {[200, 400, 600].map((p, i) => {
                  const q = questions.find((q) => q.points === p);

                  return (
                    <button
                      key={i}
                      disabled={!q}
                      onClick={() => q && setCurrentQ(q)}
                      className={`px-3 py-1 rounded text-xs
                        ${!q ? "bg-gray-500" : "bg-white/10"}
                      `}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              {/* CATEGORY */}
              <img
                src={cat.image}
                className="w-24 sm:w-28 md:w-36 h-32 sm:h-40 md:h-48 object-cover rounded-lg"
              />

              {/* RIGHT */}
              <div className="flex flex-col gap-1">
                {[200, 400, 600].map((p, i) => {
                  const q = questions.filter((q) => q.points === p)[1];

                  return (
                    <button
                      key={i}
                      disabled={!q}
                      onClick={() => q && setCurrentQ(q)}
                      className={`px-3 py-1 rounded text-xs
                        ${!q ? "bg-gray-500" : "bg-white/10"}
                      `}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* POPUP */}
      {currentQ && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-2">
          <div className="relative w-full max-w-md md:max-w-xl bg-white/10 rounded-xl p-3 text-center">

            <button
              onClick={handleClose}
              className="absolute top-2 right-2 bg-white/10 w-7 h-7 rounded-full"
            >
              ✕
            </button>

            {!showAnswer ? (
              <>
                <div className="text-xl md:text-3xl mb-2">{time}</div>

                {currentQ.image && (
                  <img
                    src={currentQ.image}
                    onClick={() => setZoomImg(currentQ.image)}
                    className="w-full h-40 md:h-56 object-contain mb-2 rounded cursor-pointer"
                  />
                )}

                <h2 className="text-sm md:text-lg mb-3">
                  {currentQ.question_text}
                </h2>

                <button
                  onClick={() => setShowAnswer(true)}
                  className="bg-purple-600 px-4 py-1 rounded"
                >
                  الجواب
                </button>
              </>
            ) : (
              <>
                {currentQ.answer_image && (
                  <img
                    src={currentQ.answer_image}
                    onClick={() => setZoomImg(currentQ.answer_image)}
                    className="w-full h-40 md:h-56 object-contain mb-2 rounded cursor-pointer"
                  />
                )}

                <h2 className="mb-3">{currentQ.answer}</h2>

                <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleAnswer(team1)}
                    className="bg-purple-600 px-4 py-1 rounded"
                  >
                    {team1}
                  </button>

                  <button
                    onClick={() => handleAnswer(team2)}
                    className="bg-purple-600 px-4 py-1 rounded"
                  >
                    {team2}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ✅ ZOOM FIX */}
      {zoomImg && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]">
          <button
            onClick={() => setZoomImg(null)}
            className="absolute top-4 right-4 text-white text-3xl"
          >
            ✕
          </button>

          <img
            src={zoomImg}
            className="max-w-[90%] max-h-[85%] object-contain rounded-xl"
          />
        </div>
      )}

      {/* RESULT */}
      {isGameFinished && (
  <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-[70]">

    <div className="relative bg-white/10 border border-white/10 p-8 rounded-2xl text-center w-[90%] max-w-md shadow-2xl animate-[fadeIn_0.5s_ease] overflow-hidden">

      {/* GLOW BACKGROUND */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-purple-500 via-transparent to-purple-700 blur-2xl"></div>

      {/* CONTENT */}
      <div className="relative z-10">

        {/* TITLE */}
        <h2 className="text-2xl font-bold mb-6 tracking-wide">
          النتائج
        </h2>

        {/* TEAM 1 */}
        <div className={`mb-4 p-3 rounded-xl border transition-all duration-300
          ${score1 > score2 ? "bg-purple-600/20 border-purple-500 animate-[pulse_1.2s_infinite]" : "bg-white/5 border-white/10"}
        `}>
          <p className="text-sm opacity-70">{team1}</p>
          <p className="text-2xl font-bold tracking-wide">{score1}</p>
        </div>

        {/* TEAM 2 */}
        <div className={`mb-6 p-3 rounded-xl border transition-all duration-300
          ${score2 > score1 ? "bg-purple-600/20 border-purple-500 animate-[pulse_1.2s_infinite]" : "bg-white/5 border-white/10"}
        `}>
          <p className="text-sm opacity-70">{team2}</p>
          <p className="text-2xl font-bold tracking-wide">{score2}</p>
        </div>

        {/* WINNER */}
        <div className="mb-6 text-lg font-semibold tracking-wide animate-[pop_0.4s_ease]">
          {score1 > score2 && (
            <span className="text-purple-400 animate-[glow_1.5s_infinite]">
              {team1}
            </span>
          )}
          {score2 > score1 && (
            <span className="text-purple-400 animate-[glow_1.5s_infinite]">
              {team2}
            </span>
          )}
          {score1 === score2 && (
            <span className="text-gray-300">تعادل</span>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/home")}
          className="mt-2 bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl transition-all duration-200 hover:scale-105"
        >
          الرجوع للرئيسية
        </button>
      </div>
    </div>

    {/* ANIMATIONS */}
    <style>
      {`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes pop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes glow {
          0% {
            text-shadow: 0 0 5px #a855f7;
          }
          50% {
            text-shadow: 0 0 20px #a855f7;
          }
          100% {
            text-shadow: 0 0 5px #a855f7;
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.03);
          }
          100% {
            transform: scale(1);
          }
        }
      `}
    </style>
  </div>
)}

      {/* TEAMS */}
      <div className="fixed bottom-0 w-full bg-black/70 p-3 flex justify-between">
        <div className="flex flex-col items-center w-1/2">
          <div>{team1}</div>

          <div className="flex items-center gap-2">
            <button onClick={() => setScore1(score1 - 100)} className="bg-purple-600 w-8 h-8 rounded-full">-</button>
            <div className="px-4">{score1}</div>
            <button onClick={() => setScore1(score1 + 100)} className="bg-purple-600 w-8 h-8 rounded-full">+</button>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/2">
          <div>{team2}</div>

          <div className="flex items-center gap-2">
            <button onClick={() => setScore2(score2 - 100)} className="bg-purple-600 w-8 h-8 rounded-full">-</button>
            <div className="px-4">{score2}</div>
            <button onClick={() => setScore2(score2 + 100)} className="bg-purple-600 w-8 h-8 rounded-full">+</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GamePage;