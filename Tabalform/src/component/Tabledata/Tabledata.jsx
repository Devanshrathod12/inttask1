import React from 'react';
import img from "../../assets/manager5.jpg"

const Tabledata = ({ getdata, deletedata,updatedata }) => {
  return (
    <div className="overflow-x-auto w-full sm:w-4/5 lg:w-3/4 mx-auto mt-8">
      <h2 className="text-center text-2xl font-bold mb-4 text-purple-600">User Data Table</h2>
      <table className="bg-white w-full border border-collapse shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <th className="p-3 font-bold text-sm md:text-base">Profile</th>
            <th className="p-3 font-bold text-sm md:text-base">Name</th>
            <th className="p-3 font-bold text-sm md:text-base">Email</th>
            <th className="p-3 font-bold text-sm md:text-base">Phone</th>
            <th className="p-3 font-bold text-sm md:text-base">Address</th>
            <th className="p-3 font-bold text-sm md:text-base">Confirm Address</th>
            <th className="p-3 font-bold text-sm md:text-base">Actions</th>
          </tr>
        </thead>
        <tbody>
        {getdata.length > 0 ? (
  getdata.map((userdata) => (
    <tr key={userdata._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-300">
      <img className='ml-3 mt-3 w-12 h-12 rounded-full border-2 border-purple-500' src={img} alt="" />
      <td className="p-2 text-gray-800 border border-gray-300 text-xs md:text-sm">{userdata.name}</td>
      <td className="p-2 text-gray-800 border border-gray-300text-xs md:text-sm">{userdata.email}</td>
      <td className="p-2 text-gray-800 border border-gray-300text-xs md:text-sm">{userdata.phone}</td>
      <td className="p-2 text-gray-800 border border-gray-300text-xs md:text-sm">{userdata.address}</td>
      <td className="p-2 text-gray-800 border border-gray-300text-xs md:text-sm">{userdata.conformaddress}</td>
      <td className="p-2 flex justify-center space-x-1">
        <button className="px-2 py-1 bg-blue-600 text-white rounded-md text-xs md:text-sm" onClick={() => updatedata(userdata._id)}>
          Update
        </button>
        <button className="px-2 py-1 bg-red-600 text-white rounded-md text-xs md:text-sm" onClick={() => deletedata(userdata._id)}>
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6" className="p-3 text-center font-extrabold text-gray-500 text-sm">
      No Users Found
    </td>
  </tr>
)}</tbody>
</table>
    </div>
  );
};

export default Tabledata;
