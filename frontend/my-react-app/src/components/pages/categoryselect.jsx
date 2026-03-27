import { useEffect, useState } from "react";
import { getCategory } from "../services/dashboardApi";
import { useNavigate } from "react-router-dom";

const GameSetup = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await getCategory();
    setCategories(res.data);
  };

  // 🔥 grouping حسب الجينري
  const groupedCategories = categories.reduce((acc, cat) => {
    if (!acc[cat.genre]) acc[cat.genre] = [];
    acc[cat.genre].push(cat);
    return acc;
  }, {});

  const handleSelect = (cat) => {
    const exists = selectedCats.some((c) => c.id === cat.id);

    if (exists) {
      setSelectedCats((prev) => prev.filter((c) => c.id !== cat.id));
    } else {
      if (selectedCats.length < 6) {
        setSelectedCats((prev) => [...prev, cat]);
      }
    }
  };

  const handleStart = () => {
    navigate("/gamepage", {
      state: {
        selectedCats,
        team1,
        team2,
      },
    });
    localStorage.removeItem("playedQuestions");
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-r from-[#C08552] to-[#8C5A3C] text-white">
      {/* BACK */}
      <button
        onClick={() => navigate("/Home")}
        className="mb-4 px-4 py-1.5 rounded-xl bg-white/10 backdrop-blur-lg border border-white/10 hover:bg-white/20 transition"
      >
        رجوع
      </button>

      <div className="flex flex-col xl:flex-row gap-6 max-w-7xl mx-auto ">
        {/* CATEGORIES */}
        <div className="flex-1">
          <h2 className="text-lg md:text-xl text-center mb-10 text-gray-300">
            اختر ستة فئات
          </h2>

          {Object.keys(groupedCategories).map((genreName) => (
            <div
              key={genreName}
              className="
    px-6 py-3
    rounded-2xl
    bg-white/5 backdrop-blur-xl
    border border-white/10
    shadow-[0_0_30px_rgba(239,233,227,0.8)]
    mb-10
  "
            >
              {/* GENRE TITLE */}
              <h3
                className="
      text-lg md:text-xl font-extrabold tracking-wider
      bg-white
      bg-clip-text text-transparent
      flex items-center justify-center
    "
              >
                {genreName}
              </h3>

              <div className="relative mt-3 w-32 h-[2px]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>

              {/* GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-5 md:gap-6 ">
                {groupedCategories[genreName].map((cat) => {
                  const isSelected = selectedCats.some((c) => c.id === cat.id);
                  const isDisabled = selectedCats.length >= 6 && !isSelected;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => !isDisabled && handleSelect(cat)}
                      className={`
                      group relative cursor-pointer rounded-2xl overflow-hidden
                      transition-all duration-300

                      ${
                        isSelected
                          ? "ring-2 ring-[rgba(239,233,227,0.6)] scale-[1.08] shadow-[0_0_30px_rgba(239,233,227,0.8)]"
                          : "bg-white/5"
                      }

                      ${
                        isDisabled
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:scale-[1.05] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      }
                    `}
                    >
                      {/* IMAGE */}
                      <img
                        src={cat.image}
                        className="w-full h-40 md:h-60 object-cover group-hover:brightness-75 transition"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* TITLE */}
                      <div
                        className="
  px-3 py-3
  bg-white/10 backdrop-blur-lg
  border-t border-white/10
  text-center
  group-hover:bg-white/10
  transition
"
                      >
                        <p
                          className="
    text-sm md:text-base font-bold tracking-wide
    bg-[rgba(239,233,227,1)]
    bg-clip-text text-transparent
  "
                        >
                          {cat.cat_name}
                        </p>
                      </div>

                      {/* GLOW EFFECT */}
                      {isSelected && (
                        <div className="absolute inset-0 border-2 border-purple-400 rounded-2xl animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* SELECTED */}
        <div
          className="
        w-full xl:w-72
        bg-white/5 backdrop-blur-xl
        border border-white/10
        p-4 rounded-2xl
        h-fit

        flex xl:flex-col
        overflow-x-auto xl:overflow-visible
        gap-3
      "
        >
          <h3 className="font-semibold text-center w-full xl:mb-3">
            Selected ({selectedCats.length}/6)
          </h3>

          <div className="flex xl:flex-col gap-3 w-full">
            {selectedCats.map((cat) => (
              <div
                key={cat.id}
                className="
                flex items-center gap-3
                bg-white/10
                border border-white/10
                px-3 py-2
                rounded-xl
                min-w-[160px]
                hover:bg-white/20 transition
              "
              >
                <img
                  src={cat.image}
                  className="w-10 h-10 object-cover rounded-lg"
                />
                <span className="text-sm font-medium">{cat.cat_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TEAMS */}
      <div className="max-w-2xl mx-auto mt-12 bg-rgba(121, 14, 14, 0.6) backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <h2 className="text-xl font-bold mb-6 text-center text-rgba(121, 14, 14, 0.6)">
          Teams
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="اسم الفريق الاول"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="
            w-full p-3 rounded-xl
            bg-white/10 border border-white
            focus:outline-none focus:ring-2 focus:ring-purple-500
            placeholder:text-white-400
          "
          />

          <input
            placeholder="اسم الفريق الثاني"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="
             w-full p-3 rounded-xl
            bg-white/10 border border-white
            focus:outline-none focus:ring-2 focus:ring-purple-500
            placeholder:text-white-400
          "
          />
        </div>

        <button
          onClick={handleStart}
          disabled={selectedCats.length < 6 || !team1 || !team2}
          className={`
          w-full mt-8 py-3 rounded-xl font-bold tracking-wide transition-all duration-300

          ${
            selectedCats.length === 6 && team1 && team2
              ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-[1.03] shadow-[0_0_20px_rgba(236,72,153,0.6)]"
              : "bg-gray-600 cursor-not-allowed opacity-60"
          }
        `}
        >
          ابدأ اللعبة
        </button>
      </div>
    </div>
  );
};

export default GameSetup;
