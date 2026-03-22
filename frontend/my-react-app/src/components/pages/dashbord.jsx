import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUsers, deleteUser, updateUser } from "../services/dashboardApi";

const Dashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    phone_number: "",
  });

  // 📥 fetch users
  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  const handleEditClick = (user) => {
    setEditUserId(user.id);
    setFormData({
      user_name: user.user_name,
      email: user.email,
      phone_number: user.phone_number,
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    await updateUser(
      id,
      formData.user_name,
      formData.email,
      formData.phone_number
    );

    setEditUserId(null);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-blue-500 p-6 ">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Dashboard
      </h1>

      <div className="max-w-3xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => navigate("/addcategory")}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          ➕ Add Category
        </button>
      </div>
      <div className="max-w-3xl mx-auto mb-4 flex justify-end">
        <button
          onClick={() => navigate("/addquestions")}
          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600"
        >
          ➕ Add Questions
        </button>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-xl shadow-md flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                ID: {user.id}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  user.is_deleted === 1
                    ? "bg-red-100 text-red-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {user.is_deleted === 1
                  ? "Deleted ❌"
                  : "Active ✅"}
              </span>
            </div>

            {editUserId === user.id ? (
              <>
                <input
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />
                <input
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  className="border p-2 rounded-lg"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(user.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditUserId(null)}
                    className="bg-gray-400 text-white px-4 py-1 rounded-lg hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="font-semibold text-lg">
                    {user.user_name}
                  </p>
                  <p className="text-gray-600">
                    {user.email}
                  </p>
                  <p className="text-gray-600">
                    {user.phone_number}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;