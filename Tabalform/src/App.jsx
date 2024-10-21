import React, { useState, useEffect } from "react";
import axios from "axios";
import FormComponent from "../src/component/Formdata/Formdata";
import Tabledata from "../src/component/Tabledata/Tabledata";

const App = () => {
  const [getdata, setgetdata] = useState([]);
  const [showForm, setShowForm] = useState(true);

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
      const result = await axios.post(
        "http://localhost:3000/api/allusersdata/data",
        { name, email, phone, address, conformaddress }
      );
      setgetdata([...getdata, result.data]); // Add the new data to the stat
    } catch (error) {
      console.error(error);
    }
  };

  // Delete function
  const deletedata = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/allusersdata/delete/${id}`);
      setgetdata(getdata.filter((user) => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // Update function
  const updatedata = async (id) => {
    const newname = prompt("Enter Name");
    const newemail = prompt("Enter Email");
    const newphone = prompt("Enter Phone");
    const newaddress = prompt("Enter Address");
    const newconformaddress = prompt("Enter Confirm Address");

    try {
      await axios.put(`http://localhost:3000/api/allusersdata/update/${id}`, {
        name: newname,
        email: newemail,
        phone: newphone,
        address: newaddress,
        conformaddress: newconformaddress,
      });

      // Update
      setgetdata(
        getdata.map((user) => {
          return user._id === id
            ? {
                _id: id,
                name: newname,
                email: newemail,
                phone: newphone,
                address: newaddress,
                conformaddress: newconformaddress,
              }
            : user;
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-center space-x-4 mt-[8rem]">
        <button
          className={`w-full max-w-md p-4 border bg-gradient-to-r from-purple-500 to-pink-500 border-gray-200 rounded-lg shadow-lg ${
            showForm ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setShowForm(true)}
        >
          User Details
        </button>
        <button
          className={`w-full max-w-md p-4 border bg-gradient-to-r from-purple-500 to-pink-500 border-gray-200 rounded-lg shadow-lg ${
            !showForm ? "opacity-100" : "opacity-50"
          }`}
          onClick={() => setShowForm(false)}
        >
          User Data
        </button>
      </div>
      <div className="mt-16">
        {showForm ? (
          <FormComponent
            postdata={postdata}
          />
        ) : (
          <Tabledata
            getdata={getdata}
            deletedata={deletedata}
            updatedata={updatedata}
          />
        )}
      </div>
    </div>
  );
};

export default App;
