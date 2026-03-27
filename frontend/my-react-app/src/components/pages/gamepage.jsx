import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGameQuestions, markQuestionPlayed } from "../services/gamepageApi";
import "../layouts/mobile.css";

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
  const [showWinner, setShowWinner] = useState(false);

  useEffect(() => {
    fetchGame();
  }, []);
  useEffect(() => {
    const saved = localStorage.getItem("playedQuestions");
    if (saved) {
      setPlayedQuestions(JSON.parse(saved));
    }
  }, []);

  const fetchGame = async () => {
    const data = await getGameQuestions(
      1,
      selectedCats.map((c) => c.id),
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

  // ⏱ TIMER
  useEffect(() => {
    if (time > 0 && currentQ && !showAnswer) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, currentQ, showAnswer]);

  // 🔥 CHECK END GAME
  useEffect(() => {
    const totalQuestions = selectedCats.length * 6;

    const saved = localStorage.getItem("playedQuestions");
    const parsed = saved ? JSON.parse(saved) : [];

    if (parsed.length === totalQuestions) {
      setShowWinner(true);
    }
  }, [playedQuestions, selectedCats]);

  const handleAnswer = async (team) => {
    await markQuestionPlayed(1, currentQ.id);

    setPlayedQuestions((prev) => {
      const key = `${currentQ.category_id}-${currentQ.points}-${currentQ.side}`;
      const updated = [...prev, key];
      localStorage.setItem("playedQuestions", JSON.stringify(updated));
      return updated;
    });

    if (team === team1) {
      setScore1((prev) => prev + currentQ.points);
    } else {
      setScore2((prev) => prev + currentQ.points);
    }

    handleClose();
  };

  // 🔥 NO ANSWER
  const handleNoAnswer = async () => {
    await markQuestionPlayed(1, currentQ.id);

    setPlayedQuestions((prev) => {
      const key = `${currentQ.category_id}-${currentQ.points}-${currentQ.side}`;
      const updated = [...prev, key];
      localStorage.setItem("playedQuestions", JSON.stringify(updated));
      return updated;
    });

    handleClose();
  };

  const handleClose = () => {
    setCurrentQ(null);
    setShowAnswer(false);
    setTime(60);
  };

  const isGameFinished = Object.keys(gameData).length === 0;

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-r from-[#C08552] to-[#8C5A3C]  text-white overflow-hidden">
      {/* HEADER */}
      <div className="flex justify-between items-center p-3">
        <button
          onClick={() => navigate("/gamesetup")}
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
              <div className="flex flex-col gap-1 ">
                {[200, 400, 600].map((p, i) => {
                  const q = questions.filter((q) => q.points === p)[0]; // LEFT
                  const key = `${q?.category_id}-${q?.points}-left`;
                  const isPlayed = playedQuestions.includes(key);

                  return (
                    <button
                      key={i}
                      disabled={isPlayed}
                      onClick={() => {
                        if (!q) return; // 🔥 أهم سطر

                        const key = `${cat.id}-${p}-left`;

                        if (!playedQuestions.includes(key)) {
                          setCurrentQ({
                            ...q,
                            side: "left",
                            points: p,
                            category_id: cat.id,
                          });
                        }
                      }}
                      className={`px-3 py-1 rounded text-xs
                        ${isPlayed ? "bg-gray-500" : "bg-white/10"}
                      `}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>

              <img
                src={cat.image}
                className="w-24 h-32 object-cover rounded-lg"
              />

              <div className="flex flex-col gap-1">
                {[200, 400, 600].map((p, i) => {
                  const q = questions.filter((q) => q.points === p)[1]; // RIGHT
                  const key = `${q?.category_id}-${q?.points}-right`;
                  const isPlayed = playedQuestions.includes(key);

                  return (
                    <button
                      key={i}
                      disabled={isPlayed}
                      onClick={() => {
                        if (!q) return; // 🔥 أهم سطر

                        const key = `${cat.id}-${p}-right`;

                        if (!playedQuestions.includes(key)) {
                          setCurrentQ({
                            ...q,
                            side: "right",
                            points: p,
                            category_id: cat.id,
                          });
                        }
                      }}
                      className={`px-3 py-1 rounded text-xs
                        ${isPlayed ? "bg-gray-500" : "bg-white/10"}
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

      {/* QUESTION POPUP */}
      {currentQ && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-2 question-modal question-modal_land">
          <div className="relative w-full max-w-md bg-gradient-to-r from-[#C08552] to-[#8C5A3C] rounded-2xl p-3 text-center shadow-xl question-card-land  ">
            {!showAnswer ? (
              <>
                <div className="text-2xl mb-2 text-white font-bold ">
                  {time}
                </div>

                {/* MEDIA (QUESTION) */}
                {(currentQ?.image || currentQ?.video) && (
                  <div className="flex justify-center items-center w-full h-[220px] md:h-[260px] bg-black/20 rounded-xl overflow-hidden mb-2">
                    {currentQ?.image && (
                      <img
                        src={currentQ.image}
                        onClick={() => setZoomImg(currentQ.image)}
                        className="w-full h-full object-contain cursor-pointer"
                      />
                    )}

                    {currentQ?.video && (
                      <video
                        controls
                        src={currentQ.video}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                )}

                {currentQ?.audio && <audio controls src={currentQ.audio} />}

                {/* QUESTION BOX */}
                <div
                  className="
            mt-3 p-4
            bg-gradient-to-r from-[#fdf6f0] to-[#f8ede3]
            text-gray-800
            rounded-2xl
            border border-gray-200
            shadow-md
          "
                >
                  <h2 className="text-base md:text-lg font-semibold leading-relaxed">
                    {currentQ?.question_text}
                  </h2>
                </div>

                <button
                  onClick={() => setShowAnswer(true)}
                  className="
              mt-4 px-5 py-2
              rounded-xl font-semibold
              bg-white text-black
              hover:scale-105 active:scale-95
              transition
            "
                >
                  عرض الجواب
                </button>
              </>
            ) : (
              <>
                {/* MEDIA (ANSWER) */}
                {(currentQ?.answer_image || currentQ?.answer_video) && (
                  <div className="flex justify-center items-center w-full h-[220px] md:h-[260px] bg-black/20 rounded-xl overflow-hidden mb-2">
                    {currentQ?.answer_image && (
                      <img
                        src={currentQ.answer_image}
                        onClick={() => setZoomImg(currentQ.answer_image)}
                        className="w-full h-full object-contain cursor-pointer"
                      />
                    )}

                    {currentQ?.answer_video && (
                      <video
                        controls
                        src={currentQ.answer_video}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>
                )}

                {currentQ?.answer_audio && (
                  <audio controls src={currentQ.answer_audio} />
                )}

                {/* ANSWER BOX */}
                <div
                  className="
            mt-1 p-1
            bg-gradient-to-r from-[#e6f7f1] to-[#dff5ec]
            text-gray-800
            rounded-2xl
            border border-green-200
            shadow-md
            
          "
                >
                  <h2 className="text-base md:text-lg font-bold leading-relaxed">
                    {currentQ?.answer}
                  </h2>
                </div>
                <p>مين جاوب؟</p>

                {/* BUTTONS */}
                <div className="flex gap-2 justify-center flex-wrap mt-4">
                  <button
                    onClick={() => handleAnswer(team1)}
                    className="
                px-4 py-2 rounded-xl font-semibold
                bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]
                text-black
                shadow-md
                hover:scale-105 active:scale-95
                transition
              "
                  >
                    {team1}
                  </button>

                  <button
                    onClick={() => handleAnswer(team2)}
                    className="
                px-4 py-2 rounded-xl font-semibold
                bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]
                                text-black

                shadow-md
                hover:scale-105 active:scale-95
                transition
              "
                  >
                    {team2}
                  </button>

                  {/* NO ANSWER */}
                </div>
                <button
                  onClick={handleNoAnswer}
                  className="
                px-4 py-2 rounded-xl font-semibold
                bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]
                                text-black

                shadow-md
                hover:scale-105 active:scale-95
                transition
                margen
                mt-5
              "
                >
                  ما حدا جاوب
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {zoomImg && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[999]"
          onClick={() => setZoomImg(null)}
        >
          <img
            src={zoomImg}
            className="max-w-[95%] max-h-[95%] rounded-xl shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-[fadeIn_0.3s]"
          />
        </div>
      )}

      {/* 🏆 WINNER POPUP */}
      {showWinner && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4">
          <div className="w-full max-w-2xl bg-[#1f1b3a]/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl text-center shadow-[0_0_40px_rgba(168,85,247,0.4)] animate-[fadeIn_0.5s] question-card-land">
            {/* TITLE */}
            <h2 className="text-2xl md:text-3xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              النتيجة النهائية
            </h2>

            {/* CHART */}
            <div className="flex items-end justify-center gap-6 md:gap-10 h-48 mb-8">
              {/* TEAM 1 */}
              <div className="flex flex-col items-center w-1/2">
                <div
                  className="w-12 md:w-16 rounded-t-xl bg-gradient-to-t from-purple-600 to-pink-400 transition-all duration-500"
                  style={{
                    height: `${(score1 / Math.max(score1, score2, 1)) * 100}%`,
                  }}
                ></div>
                <p className="mt-2 text-sm md:text-base">{team1}</p>
                <span className="text-purple-300 font-bold">{score1}</span>
              </div>

              {/* TEAM 2 */}
              <div className="flex flex-col items-center w-1/2">
                <div
                  className="w-12 md:w-16 rounded-t-xl bg-gradient-to-t from-indigo-600 to-blue-400 transition-all duration-500"
                  style={{
                    height: `${(score2 / Math.max(score1, score2, 1)) * 100}%`,
                  }}
                ></div>
                <p className="mt-2 text-sm md:text-base">{team2}</p>
                <span className="text-blue-300 font-bold">{score2}</span>
              </div>
            </div>

            {/* WINNER */}
            <div className="mb-6 text-xl md:text-2xl font-bold">
              {score1 > score2 && (
                <span className="text-purple-400 animate-[glow_1.5s_infinite]">
                  🏆 {team1} الفائز
                </span>
              )}

              {score2 > score1 && (
                <span className="text-blue-400 animate-[glow_1.5s_infinite]">
                  🏆 {team2} الفائز
                </span>
              )}

              {score1 === score2 && (
                <span className="text-gray-300">🤝 تعادل</span>
              )}
            </div>

            {/* BUTTON */}
            <button
              onClick={() => navigate("/home")}
              className="mt-2 w-full py-3 rounded-xl font-bold
        bg-gradient-to-r from-purple-600 to-pink-500
        hover:scale-[1.03] transition shadow-[0_0_20px_rgba(236,72,153,0.6)]"
            >
              الرجوع للرئيسية
            </button>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
        @keyframes fadeIn {
          from {opacity:0; transform:scale(0.9);}
          to {opacity:1; transform:scale(1);}
        }

        @keyframes pop {
          0% {transform:scale(0.8); opacity:0;}
          100% {transform:scale(1); opacity:1;}
        }

        @keyframes glow {
          0% {text-shadow:0 0 5px #a855f7;}
          50% {text-shadow:0 0 20px #a855f7;}
          100% {text-shadow:0 0 5px #a855f7;}
        }
        `}
      </style>
      <div className="fixed bottom-0 w-full bg-black/70 p-3 flex justify-between">
        <div className="flex flex-col items-center w-1/2">
          <div>{team1}</div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScore1(score1 - 100)}
              className="bg-gradient-to-r from-[#C08552] to-[#8C5A3C] w-8 h-8 rounded-full"
            >
              -
            </button>
            <div className="px-4 ">{score1}</div>
            <button
              onClick={() => setScore1(score1 + 100)}
              className="bg-gradient-to-r from-[#C08552] to-[#8C5A3C] w-8 h-8 rounded-full"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center w-1/2">
          <div>{team2}</div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setScore2(score2 - 100)}
              className="bg-gradient-to-r from-[#C08552] to-[#8C5A3C] w-8 h-8 rounded-full"
            >
              -
            </button>
            <div className="px-4">{score2}</div>
            <button
              onClick={() => setScore2(score2 + 100)}
              className="bg-gradient-to-r from-[#C08552] to-[#8C5A3C] w-8 h-8 rounded-full"
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
