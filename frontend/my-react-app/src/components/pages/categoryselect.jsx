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

  const handleSelect = (cat) => {
    const exists = selectedCats.some((c) => c.id === cat.id);

    if (exists) {
      // unselect
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
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* categories */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-8">
            فتح مخك
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => {
              const isSelected = selectedCats.some((c) => c.id === cat.id);
              const isDisabled = selectedCats.length >= 6 && !isSelected;

              return (
                <div
                  key={cat.id}
                  onClick={() => !isDisabled && handleSelect(cat)}
                  className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200
                  
                  ${
                    isSelected
                      ? "ring-4 ring-purple-500 scale-105 bg-white/20"
                      : "bg-white/10"
                  }
                  
                  ${
                    isDisabled
                      ? "opacity-30 cursor-not-allowed"
                      : "hover:scale-105 hover:ring-2 hover:ring-white/30"
                  }
                  `}
                >
                  <img
                    src={cat.image}
                    className="w-full h-32 md:h-40 object-cover"
                  />

                  <div className="text-center py-2">
                    <p className="text-sm md:text-base font-medium">
                      {cat.cat_name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* selected */}
        <div className="w-full lg:w-64 bg-white/10 backdrop-blur-md p-4 rounded-xl h-fit">
          <h3 className="font-semibold mb-3 text-center">
            Selected ({selectedCats.length}/6)
          </h3>

          <div className="space-y-2">
            {selectedCats.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center gap-2 bg-white/10 p-2 rounded"
              >
                <img
                  src={cat.image}
                  className="w-10 h-10 object-cover rounded"
                />
                <span className="text-sm">{cat.cat_name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* teams */}
      <div className="max-w-2xl mx-auto mt-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl">
        <h2 className="text-lg md:text-xl font-semibold mb-6 text-center">
          Teams
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            placeholder="Team 1"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            className="w-full p-2 rounded bg-white/20"
          />

          <input
            placeholder="Team 2"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            className="w-full p-2 rounded bg-white/20"
          />
        </div>

        <button
          onClick={handleStart}
          disabled={selectedCats.length < 6 || !team1 || !team2}
          className={`w-full mt-6 py-2 rounded font-semibold
    ${
      selectedCats.length === 6 && team1 && team2
        ? "bg-purple-600 hover:bg-purple-700"
        : "bg-gray-500 cursor-not-allowed"
    }
  `}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameSetup;
