// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setUsers } from "../features/users/userSlice";
// import { getUsers } from "../services/usersApi";


// const Dashboard = () => {
//   const dispatch = useDispatch();

//   const { users, loading, error } = useSelector((state) => state.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await getUsers();
//       dispatch(setUsers(data));

//     };
//     fetchData();
//   }, []);

//     return (
//       <div className="p-5">
//         <h1 className="text-2xl mb-4">Users</h1>

//         {loading && <p>Loading...</p>}
//         {error && <p className="text-red-500">{error}</p>}

//         {users.map((user) => (
//           <div key={user.id} className="p-2 border mb-2">
//             {user.user_name}
//             {user.email}

//           </div>
//         ))}
//       </div>
//     );
// };

// export default Dashboard;
