import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Guest from "../guest/guest";
const FormComponent = ({ postdata }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [conformaddress, setconformaddress] = useState("");
  const [role, setRole] = useState("User");

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for empty fields
    if (!name || !email || !phone || !password || !address || !conformaddress) {
      toast.error("Please fill in all fields");
      return;
    }
  
    // Confirm address matches
    if (address !== conformaddress) {
      toast.error("Address and confirm address do not match.");
      return;
    }
  
    // Validate phone length
    if (phone.length <= 9) {
      toast.error("Phone number is not valid.");
      return;
    }
  
    // Remove extra spaces from fields
    const cleanedName = name.trim();
    const cleanedEmail = email.trim();
    const cleanedPhone = phone.trim();
    const cleanedPassword = password.trim();
    const cleanedAddress = address.trim();
    const cleanedconformaddress = conformaddress.trim();
  
    try {
      // Call postdata function and pass cleaned data
      const result = await postdata(
        cleanedName,
        cleanedEmail,
        cleanedPhone,
        cleanedPassword,
        cleanedAddress,
        cleanedconformaddress,
        role
      );
  
      if (result) {
        
        // Redirect based on role after successful submission
        if (role === "Admin") {
          navigate("/Admin");
          toast.success("Admin Details Added Successfully"); // Adjust this to your admin component route
        } else if (role === "User") {
          navigate("/data");
          toast.success("User Details Added Successfully"); // Adjust this to the user data page
        } else if (role === "Guest") {
           navigate("/Guest")
           toast.success("Guest Added Successfully");
        }else{
          console.log("error");
        }
      }
    } catch (error) {
      toast.error("Failed to add user details");
    } finally {
      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setAddress("");
      setconformaddress("");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg rounded-lg p-8 mt-8 max-w-lg mx-auto">
    <h2 className="text-2xl font-semibold mb-6 text-center">User Registration</h2>
    
    {/* Name Input */}
    <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor="name">Name:</label>
    <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    placeholder="Enter your name"
    className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-purple-400"
    required
    />
    </div>
    
    {/* Email Input */}
    <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor="email">Email:</label>
    <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Enter your email"
    className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-purple-400"
    required
    />
    </div>
    
    {/* Phone Input */}
    <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor="phone">Phone:</label>
    <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    placeholder="Enter your phone number"
    className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-purple-400"
    required
    />
    </div>
    
    {/* Password Input */}
    <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor="password">Password:</label>
    <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Enter your password"
    className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-purple-400"
    required
    />
    </div>
    
    {/* Address Input */}
    <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor="address">Address:</label>
    <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Enter your address"
    className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-purple-400"
    required
    />
    </div>
    
    {/* Confirm Address Input */}
    <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor="conformaddress">Confirm Address:</label>
    <input
    type="text"
    value={conformaddress}
    onChange={(e) => setconformaddress(e.target.value)}
    placeholder="Confirm your address"
    className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-purple-400"
    required
    />
    </div>
    
    {/* Role Selection Dropdown */}
    <div className="mb-4">
    <label className="block text-sm font-bold mb-2" htmlFor="role">Role:</label>
    <select
    value={role}
    onChange={(e) => setRole(e.target.value)}
    className="shadow appearance-none border border-purple-300 rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:border-purple-400"
    >
    <option value="User">User</option>
    <option value="Admin">Admin</option>
    <option value="Guest">Guest</option>
    </select>
    </div>
    
    {/* Submit Button */}
    <button
    type="submit"
    className="bg-white text-purple-500 hover:bg-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
    >
    Submit
    </button>
    </form>
  );
};

export default FormComponent;
