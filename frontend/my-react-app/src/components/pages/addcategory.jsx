import { useEffect, useState } from "react";
import { addCategory, getCategory } from "../services/dashboardApi";

const AddCategory = () => {
  const [catName, setCatName] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const data = await getCategory();
    setCategories(data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDrop = (e) => {
    e.preventDefault();
    setImage(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!catName || !image) {
      alert("عبّي كل الحقول");
      return;
    }

    await addCategory(catName, image);

    setCatName("");
    setImage(null);
    fetchCategories();
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-[#1a1a1a] via-[#2c2c2c] to-[#0f0f0f]">
      <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl max-w-md mx-auto mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">
          ➕ إضافة Category
        </h2>

        <input
          type="text"
          placeholder="اسم الكاتيجوري"
          value={catName}
          onChange={(e) => setCatName(e.target.value)}
          className="w-full border p-2 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-[#38598b]"
        />

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed p-6 text-center rounded-lg cursor-pointer mb-4 hover:bg-gray-50 transition"
        >
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mx-auto h-32 object-cover rounded-lg"
            />
          ) : (
            <p className="text-gray-500">اسحب الصورة هون أو اضغط للاختيار 📁</p>
          )}

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
            id="fileUpload"
          />
          <label
            htmlFor="fileUpload"
            className="block mt-2 text-blue-500 cursor-pointer"
          >
            اختر صورة
          </label>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-[#38598b] to-[#113f67] text-white py-2 rounded-lg hover:opacity-90 transition"
        >
          إضافة 🚀
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <img
              src={cat.image} // لازم يرجع URL من cloudinary
              alt={cat.cat_name}
              className="w-full h-90 object-cover"
            />

            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {cat.cat_name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;
