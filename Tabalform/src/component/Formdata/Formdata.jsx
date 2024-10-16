import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios"
const Formdata = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [listdata,setlistdata] = useState([])
  
  const postdata = async(id)=>{
    const result = await axios.post("http://localhost:3000/post",{name:name,email:email,phone:phone,password:password})
    //setlistdata([...listdata,{_id:result.data.id,name:name,email:email,phone:phone,password:password}])
    setlistdata(list.map((val)=>{
      return val._id==id?{_id:id,name:name,email:email,phone:phone,password:password}:val;
     }))
  }

  //const deletedata = 

  return (
  //   <div className="p-4 ml-[28rem] w-[18rem] justify-between">
  //   <input type="text" placeholder="Enter Name" className="w-full p-2 mb-3 bg-gray-100 border border-gray-300 text-white font-bold" onChange={(e)=>setname(e.target.value)} />
  //   <input type="email" placeholder="Enter Email" className="w-full p-2 mb-3 bg-gray-100 border font-bold border-gray-300"onChange={(e)=>setemail(e.target.value)}/>
  //   <input type="tel" placeholder="Enter Phone" className="w-full p-2 mb-3 bg-gray-100 border font-bold border-gray-300"onChange={(e)=>setphone(e.target.value)}/>
  //    <input type="password"  placeholder="Enter Password" className="w-full p-2 mb-3 bg-gray-100 border font-bold border-gray-300" onChange={(e)=>setpassword(e.target.value)}/>
  //    <button  onClick={postdata} className="w-full p-2 bg-blue-500 text-white font-bold">Submit</button>
  // </div>
  <div className="p-6 ml-[28rem] w-[20rem] justify-between bg-green-200 rounded-lg shadow-lg">
    <input 
        type="text" 
        placeholder="Enter Name" 
        className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
        onChange={(e) => setname(e.target.value)} 
    />
    <input 
        type="email" 
        placeholder="Enter Email" 
        className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
        onChange={(e) => setemail(e.target.value)} 
    />
    <input 
        type="tel" 
        placeholder="Enter Phone" 
        className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
        onChange={(e) => setphone(e.target.value)} 
    />
    <input 
        type="password" 
        placeholder="Enter Password" 
        className="w-full p-3 mb-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none hover:bg-gray-100 transition duration-300" 
        onChange={(e) => setpassword(e.target.value)} 
    />
    <button 
        onClick={postdata} 
        className="w-full p-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
    >
        Submit
    </button>
</div>
  )
}

export default Formdata
