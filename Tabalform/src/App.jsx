import React, { useState, useEffect } from "react";
import axios from "axios";
import FormComponent from "../src/component/Formdata/Formdata";
import { BrowserRouter as Router, Routes, Route , Link, useNavigate} from 'react-router-dom';
import Tabledata from "../src/component/Tabledata/Tabledata";
import {ToastContainer} from "react-toastify"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  const [getdata, setgetdata] = useState([]);
  // Fetch data
  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/allusersdata/alldata"
        );
        setgetdata(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fecthData();
  }, []);

  // Post new dat
  const postdata = async (name, email, phone, address, conformaddress) => {
    try {
        const response = await axios.post("http://localhost:3000/api/allusersdata/data", {
            name,
            email,
            phone,
            address,
            conformaddress,
        });

        // New users 
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
    <div className="relative w-full p-[8rem] h-screen bg-cover bg-center bg-[url('./assets/wwwwww.jpg')]">
       <Router>
       <Link 
            to="/" 
            className="px-20 py-2 ml-[38rem] mr-[4rem] bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-300"
        >
            Form
        </Link>
        <Link 
            to="/data" 
            className="px-16 py-2  bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition duration-300"
        >
            Table Data
        </Link>
            <Routes>
                <Route path="/" element={<FormComponent postdata={postdata} />} />
                <Route path="/data" element={
                    <Tabledata 
                        getdata={getdata}
                        deletedata={deletedata}
                        updatedata={updatedata}
                    />
                } />
            </Routes>
        </Router>
        <ToastContainer/>
    </div>
    </>
  );
};

export default App;
