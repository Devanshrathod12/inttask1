import React, { useState, useEffect } from "react";
import axios from "axios";
import Admin from "./component/Admin/Admin";
import FormComponent from "../src/component/Formdata/Formdata";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Tabledata from "../src/component/Tabledata/Tabledata";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Guest from "./component/guest/guest";

const App = () => {
  const [getdata, setgetdata] = useState([]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/allusersdata/alldata");
        setgetdata(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Post new data
  const postdata = async (name, email, phone, password, address, conformaddress, role) => {
    try {
      const response = await axios.post("http://localhost:3000/api/allusersdata/data", {
        name,
        email,
        phone,
        password,
        address,
        conformaddress,
        role // Include the role in the request body
      });

      // Handle new user addition
      setgetdata((prevData) => [...prevData, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add user. Please try again.");
      }
    }
  };

  // Delete function
  const deletedata = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/allusersdata/delete/${id}`);
      // Update state to remove the deleted user
      setgetdata((prevData) => prevData.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Update function
  const updatedata = async (id, updatedUser) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/allusersdata/update/${id}`, updatedUser);
      // Handle response if needed, e.g., updating local state
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <>
      <div className="relative w-full h-screen bg-cover bg-center bg-[url('./assets/wwwwww.jpg')] p-8 md:p-16 lg:p-32">
        <Router>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
            <Link
              to="/"
              className="px-8 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-300"
            >
              User Form
            </Link>
            <Link
              to="/data"
              className="px-8 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-300"
            >
              User Details
            </Link>
          </div>

          <Routes>
            <Route path="/" element={<FormComponent postdata={postdata} />} />
            <Route
              path="/data"
              element={
                <Tabledata
                  getdata={getdata}
                  deletedata={deletedata}
                  updatedata={updatedata}
                />
              }
            />
            <Route path="/Admin"  element={<Admin 
               getdata={getdata}
               deletedata={deletedata}
               updatedata={updatedata}
            />} 
            />
            <Route path="/Guest"  element={<Guest 
               getdata={getdata}
               deletedata={deletedata}
               updatedata={updatedata}
            />} 
            />
          </Routes>
        </Router>

        <ToastContainer />
      </div>
    </>
  );
};

export default App;
