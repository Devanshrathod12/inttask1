import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const FormComponent = ({ postdata }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [conformaddress, setConformAddress] = useState('');
  
  const navigate = useNavigate();

  const removeExtraSpaces =(str)=>{
   return str.trim().split(/\s+/).join(' ')

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!name || !email || !phone || !address || !conformaddress) {
        toast.error("Please fill in all fields");
        return;
    }

    if (address !== conformaddress) {
      toast.error("Address and confirm address do not match.");
      return;
  }
  if (phone.length <= 9) {
    toast.error("Phone number is not valid.");
    return;
}


    // Remove extra spaces
    const cleanedName = removeExtraSpaces(name);
    const cleanedEmail = removeExtraSpaces(email);
    const cleanedPhone = removeExtraSpaces(phone);
    const cleanedAddress = removeExtraSpaces(address);
    const cleanedConformAddress = removeExtraSpaces(conformaddress);

    try {
        const result = await postdata(cleanedName, cleanedEmail, cleanedPhone, cleanedAddress, cleanedConformAddress);
        if (result) {
            toast.success("User registered successfully");
            navigate('/data');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            toast.error("User with this email already exists.");
        } else {
            toast.error("Failed to add user. Please try again.");
        }
    } finally {
        setName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setConformAddress('');
    }
};
  return (
    <> 
    <div className=''>
    <h2 className="text-center text-2xl mt-8  font-bold mb-4 text-purplez-600">User Details</h2>
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-6 p-4 border bg-gradient-to-r from-purple-500 to-pink-500 border-gray-200 rounded-lg shadow-lg">
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
      <input
        className="w-full px-3 py-2 border font-extrabold border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
        type="text"
        placeholder='Enter Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-semibold mb-1">Email</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 font-extrabold rounded-md text-sm focus:outline-none focus:border-blue-500"
        type="email"
        placeholder='Enter Email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-semibold mb-1">Phone</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 font-extrabold rounded-md text-sm focus:outline-none focus:border-blue-500"
        type="text"
        placeholder='Enter Phone'
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-semibold mb-1">Address</label>
      <input
        className="w-full px-3 py-2 border font-extrabold border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
        type="text"
        placeholder='Enter Address'
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-semibold mb-1">Confirm Address</label>
      <input
        className="w-full px-3 py-2 border font-extrabold border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
        type="text"
        placeholder='Enter confirm Address'
        value={conformaddress}
        onChange={(e) => setConformAddress(e.target.value)}
      />
    </div>
    <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">
      Submit
    </button>
  </form>
    </div>
    
  </>
  );
};


export default FormComponent;
