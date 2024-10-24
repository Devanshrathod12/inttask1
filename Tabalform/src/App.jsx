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
      // new users data
      setgetdata((prevData) => [...prevData, response.data]);
  
      // responce 
      return response.data;
    } catch (error) {
      console.error("Error posting data:", error);
      toast.error("Failed to add user. Please try again."); // Display error message
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
    <div>
       <Router>
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
