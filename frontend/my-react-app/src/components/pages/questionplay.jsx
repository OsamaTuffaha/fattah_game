import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { markQuestionPlayed } from "../services/gamepageApi";

const QuestionPlay = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const UserId = localStorage.getItem('userId')

  // 🛑 حماية
  if (!location.state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-black">
        No Question Data
      </div>
    );
  }

  const { question, team1, team2 } = location.state;

  const [time, setTime] = useState(60);
  const [showAnswer, setShowAnswer] = useState(false);

  // ⏱ تايمر
  useEffect(() => {
    if (time > 0 && !showAnswer) {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, showAnswer]);

  // ✅ اختيار الفريق
  const handleAnswer = async (team) => {
    try {
      await markQuestionPlayed(UserId, question.id); // 👈 userId لاحقًا نربطه باللوجن

      navigate(-1, {
        state: {
          answered: true,
          questionId: question.id,
          points: question.points,
          team,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6">
      {!showAnswer ? (
        <>
          {/* ⏱ TIMER */}
          <div className="text-5xl font-bold mb-8">{time}</div>

          {/* 🖼 IMAGE */}
          {question.image && (
            <img
              src={question.image}
              className="w-full max-w-md h-64 object-contain mx-auto mb-6 rounded-xl"
            />
          )}

          {/* ❓ QUESTION */}
          <h2 className="text-xl text-center mb-8 max-w-xl">
            {question.question_text}
          </h2>

          {/* BUTTON */}
          <button
            onClick={() => setShowAnswer(true)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl"
          >
            إظهار الجواب
          </button>
        </>
      ) : (
        <>
          {/* 🧠 ANSWER IMAGE */}
          {question.answer_image && (
            <img
              src={question.answer_image}
              className="w-full max-w-md h-64 object-contain mx-auto mb-6 rounded-xl"
            />
          )}

          {/* 🧠 ANSWER */}
          <h2 className="text-xl text-center mb-8">{question.answer}</h2>

          {/* 👥 TEAMS */}
          <div className="flex gap-4">
            <button
              onClick={() => handleAnswer(team1)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl"
            >
              {team1}
            </button>

            <button
              onClick={() => handleAnswer(team2)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-xl"
            >
              {team2}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuestionPlay;
