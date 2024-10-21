import axios from 'axios';
import React, { useState } from 'react';

const FormComponent = ({ postdata }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [conformaddress, setConformAddress] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    postdata(name, email, phone, address, conformaddress);
    // Clear the form after submission
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setConformAddress('');

  };
  

  return (
    <>
    
    <h2 className="text-center text-2xl font-bold mb-4 text-purple-600">User Details</h2>
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mt-6 p-4 border bg-gradient-to-r from-purple-500 to-pink-500 border-gray-200 rounded-lg shadow-lg">
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-semibold mb-1">Name</label>
      <input
        className="w-full px-3 py-2 border font-extrabold border-gray-300 rounded-md text-sm focus:outline-none focus:border-blue-500"
        type="text"
        placeholder='Enter Name'
        required
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
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  
    <div className="mb-3">
      <label className="block text-gray-700 text-sm font-semibold mb-1">Phone</label>
      <input
        className="w-full px-3 py-2 border border-gray-300 font-extrabold rounded-md text-sm focus:outline-none focus:border-blue-500"
        type="text"
        required
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
        required
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
        required
        value={conformaddress}
        onChange={(e) => setConformAddress(e.target.value)}
      />
    </div>

  
    <button className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-md shadow-md hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="submit">
      Submit
    </button>
  </form>
  </>
  );
};


export default FormComponent;
