import React, { useState } from "react";
import img from "../../assets/manager5.jpg";
import FormDialog from "../UserForm/FormDialog";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ViweDialog from "../Viwe/Viwe";
//rupesh patil
const Guest = ({ getdata, deletedata }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(getdata);
  const [viewUser, setViewUser] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  const handleUpdate = (userId) => {
    const user = users.find((user) => user._id === userId);
    setSelectedUser(user);
  };

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    await deletedata(id);
    setUsers(users.filter((user) => user._id !== id));
    toast.error("User delete successfully");
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
        users.map(
          (user) => (user._id === id ? { ...user, ...updatedUser } : user),
          toast.success("User Detailed Updated successfully")
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

  const handleViewOpen = (user) => {
    setViewUser(user);
    setIsViewOpen(true);
  };

  const handleViewClose = () => {
    setIsViewOpen(false);
    setViewUser(null);
  };

  return (
    <>
     <div className="overflow-x-auto mt-5 w-full sm:w-4/5 lg:w-3/4 mx-auto">
  <h2 className="text-center text-2xl font-bold mb-4 text-gray-600">
    User Data Cards
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {users.length > 0 ? (
      users.map((userdata) => (
        <div
          key={userdata._id}
          className="bg-white shadow-lg rounded-lg p-6 transition duration-300 hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-white"
        >
          <div className="flex flex-col items-center">
            <img
              className="w-24 h-24 rounded-full border-4 border-purple-500 mb-4 shadow-lg transition-transform duration-300 hover:scale-105"
              src={img}
              alt={userdata.name}
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1 hover:text-white">
              {userdata.name}
            </h3>
            <p className="text-gray-600 hover:text-white">{userdata.email}</p>
            <p className="text-gray-600 hover:text-white">{userdata.phone}</p>
            <p className="text-gray-600 hover:text-white">{userdata.address}</p>
            <p className="text-gray-600 mb-4 hover:text-white">
              {userdata.conformaddress}
            </p>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-1 sm:col-span-2 lg:col-span-3">
        <p className="p-3 text-center font-extrabold text-gray-500 text-sm">
          No Users Found
        </p>
      </div>
    )}
  </div>
</div>


      {selectedUser && (
        <FormDialog initialData={selectedUser} onSubmit={handleFormSubmit} />
      )}

      {viewUser && (
        <ViweDialog
          open={isViewOpen}
          onClose={handleViewClose}
          user={viewUser}
        />
      )}
    </>
  );
};
export default Guest;