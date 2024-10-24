import React, { useState } from "react";
import img from "../../assets/manager5.jpg";
import FormDialog from "../UserForm/FormDialog";
import axios from "axios";
import { toast } from 'react-toastify';

//rupesh patil
const Tabledata = ({ getdata, deletedata }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(getdata); 

  const handleUpdate = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
  };

  const handleDelete = async (id) => {
    await deletedata(id);
    setUsers(users.filter((user) => user._id !== id)); 
    toast.error("User delete successfully")
    // imp delete method to delete data without re rendring the page
  };

  const updatedata = async (id, updatedUser) => {
    try {
      await axios.put(
        `http://localhost:3000/api/allusersdata/update/${id}`,
        updatedUser
      );
      // Update local state after successful update
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, ...updatedUser } : user,
        toast.success("User Dtailed Update successfully")
        )
      );
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleFormSubmit = async (data) => {
    await updatedata(selectedUser._id, data);
    setSelectedUser(null); // Close the form
  };

  return (
    <>
      <div className="overflow-x-auto w-full sm:w-4/5 lg:w-3/4 mx-auto mt-8">
        <h2 className="text-center text-2xl font-bold mb-4 text-purple-600">
          User Data Table
        </h2>
        <table className="bg-white w-full border border-collapse shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <th className="p-3 font-bold text-sm md:text-base">Profile</th>
              <th className="p-3 font-bold text-sm md:text-base">Name</th>
              <th className="p-3 font-bold text-sm md:text-base">Email</th>
              <th className="p-3 font-bold text-sm md:text-base">Phone</th>
              <th className="p-3 font-bold text-sm md:text-base">Address</th>
              <th className="p-3 font-bold text-sm md:text-base">
                Confirm Address
              </th>
              <th className="p-3 font-bold text-sm md:text-base">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((userdata) => (
                <tr
                  key={userdata._id}
                  className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
                >
                  <td className="p-2">
                    <img
                      className="w-12 h-12 rounded-full border-2 border-purple-500"
                      src={img}
                      alt={userdata.name}
                    />
                  </td>
                  <td className="p-2 text-gray-800 border border-gray-300 text-xs md:text-sm">
                    {userdata.name}
                  </td>
                  <td className="p-2 text-gray-800 border border-gray-300 text-xs md:text-sm">
                    {userdata.email}
                  </td>
                  <td className="p-2 text-gray-800 border border-gray-300 text-xs md:text-sm">
                    {userdata.phone}
                  </td>
                  <td className="p-2 text-gray-800 border border-gray-300 text-xs md:text-sm">
                    {userdata.address}
                  </td>
                  <td className="p-2 text-gray-800 border border-gray-300 text-xs md:text-sm">
                    {userdata.conformaddress}
                  </td>
                  <td className="p-2 flex justify-center space-x-1">
                    <button
                      className="px-2 py-1 bg-blue-600 text-white rounded-md text-xs md:text-sm"
                      onClick={() => handleUpdate(userdata._id)}
                    >
                      Update
                    </button>
                    <button
                      className="px-2 py-1 bg-red-600 text-white rounded-md text-xs md:text-sm"
                      onClick={() => handleDelete(userdata._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="p-3 text-center font-extrabold text-gray-500 text-sm"
                >
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <FormDialog initialData={selectedUser} onSubmit={handleFormSubmit} />
      )}
    </>
  );
};

export default Tabledata;
