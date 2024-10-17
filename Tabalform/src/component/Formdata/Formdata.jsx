import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Formdata = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [conformaddress, setconformaddress] = useState("");

  const postdata = async (id) => {
    const result = await axios.post(
      "http://localhost:3000/api/allusersdata/data",
      { name: name, email: email, phone: phone, address:address,conformaddress:conformaddress}
    );
  };
 
  return (
    <div className="p-6 mb-4 ml-[28rem] w-[20rem] justify-between bg-gray-500  rounded-lg shadow-lg">
      <input type="text" 
      placeholder="Enter Name" 
      className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
      onChange={(e) => setname(e.target.value)}/>
      <input type="email" 
      placeholder="Enter Email" 
      className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
      onChange={(e) => setemail(e.target.value)}/>
      <input type="tel" 
      placeholder="Enter Phone" 
      className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
      onChange={(e) => setphone(e.target.value)}/>
      <input type="address" 
      placeholder="Enter address"
      className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
      onChange={(e) => setaddress(e.target.value)}/>
      <input type="conformaddress" 
      placeholder="Enter Confirm Address"
      className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
      onChange={(e) => setconformaddress(e.target.value)}/>
      <button onClick={postdata}
        className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      > Submit </button>
    </div>
  );
};

export default Formdata;
