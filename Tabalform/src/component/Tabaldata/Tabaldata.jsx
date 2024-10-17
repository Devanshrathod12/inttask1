import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react'

const Tabaldata = () => {

  const [getdata, setgetdata] = useState([])

  useEffect(() => {
    const fecthData = async () => {
       try {
         const response = await axios.get("http://localhost:3000/api/allusersdata/alldata")
         setgetdata(response.data)
       } catch (error) {
         console.error(error)
       }
    }
    fecthData()
  }, [])

  const deletedata = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/allusersdata/delete/${id}`);
      setgetdata(getdata.filter(user => user._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const updatedata = async(id)=>{
    const newname = prompt("Enter Name")
    const newemail = prompt("Enter Email")
    const newphone = prompt("Enter Phone")
    const newaddress = prompt("Enter Address")
    const newconformaddress = prompt("Enter Confirm address")

    try {
      const data = await axios.put(`http://localhost:3000/api/allusersdata/update/${id}`,
        {name:newname,
          email:newemail,
          phone:newphone,
          address:newaddress,
          conformaddress:newconformaddress})
        setgetdata(getdata.map((userdata)=>{
          return userdata._id==id?{_id:id,name:newname,
            email:newemail,
            phone:newphone,
            address:newaddress,
            conformaddress:newconformaddress
          }:userdata;
        }))
    } catch (error) {
        console.log(error);
        
       }
  }

  return (
    <div className="overflow-x-auto">
     <table className="mt-4 bg-blue-100 w-full sm:w-4/5 mx-auto border border-collapse border-gray-300">
  <thead>
    <tr>
      <th className="border border-gray-300 font-bold p-2 text-sm md:text-base">Name</th>
      <th className="border border-gray-300 font-bold p-2 text-sm md:text-base">Email</th>
      <th className="border border-gray-300 font-bold p-2 text-sm md:text-base">Phone</th>
      <th className="border border-gray-300 font-bold p-2 text-sm md:text-base">Address</th>
      <th className="border border-gray-300 font-bold p-2 text-sm md:text-base">Confirm Address</th>
      <th className="border border-gray-300 font-bold p-2 text-sm md:text-base">Action</th>
    </tr>
  </thead>
  <tbody>
  { getdata.map((userdata) => (
            <tr key={userdata._id}>
              <td className="border border-gray-300 p-2 text-xs md:text-base">{userdata.name}</td>
              <td className="border border-gray-300 p-2 text-xs md:text-base">{userdata.email}</td>
              <td className="border border-gray-300 p-2 text-xs md:text-base">{userdata.phone}</td>
              <td className="border border-gray-300 p-2 text-xs md:text-base">{userdata.address}</td>
              <td className="border border-gray-300 p-2 text-xs md:text-base">{userdata.conformaddress}</td>
              <td className="border border-gray-300 p-2">
              <button className='p-2 md:p-3 ml-4 mr-2 bg-red-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none' onClick={()=>deletedata(userdata._id)}>Delete</button>
              <button className='p-2 md:p-3  bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none' onClick={()=>updatedata(userdata._id)}>update</button>
              </td>
            </tr>
          ))}
  </tbody>
</table>
    </div>
  )
}

export default Tabaldata
