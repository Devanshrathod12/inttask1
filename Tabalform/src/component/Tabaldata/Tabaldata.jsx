import React from 'react'
import axios from 'axios'
import { useState , useEffect } from 'react'
const Tabaldata = () => {


  const [getdata, setgetdata] = useState([])


  useEffect(() => {
    const  fecthData = async () => {
       try {
         const response = await axios.get("http://localhost:3000/get")
         setgetdata(response.data)
       } catch (error) {
         res.send(error)
       }
    }
    fecthData()
  }, [])

  const deletedata = async(id)=>{
    const data = await axios.delete(`http://localhost:3000/delete/${id}`)
    setlist(list.filter((val)=>{
      return val._id!=id;
    }))
}  
  

  return (
    <div>
     <table className="mt-4 bg-blue-100 ml-[8rem] w-4/5 border border-collapse border-gray-300">
  <thead>
    <tr>
      <th className="border border-gray-300 p-2">Name</th>
      <th className="border border-gray-300 p-2">Email</th>
      <th className="border border-gray-300 p-2">phone</th>
      <th className="border border-gray-300 p-2">password</th>
    </tr>
  </thead>
  <tbody>
  {getdata.map((userdata) => (
            <tr key={userdata._id}>
              <td className="border border-gray-300 p-2">{userdata.name}</td>
              <td className="border border-gray-300 p-2">{userdata.email}</td>
              <td className="border border-gray-300 p-2">{userdata.phone}</td>
              <td className="border border-gray-300 p-2">{userdata.password}</td>
              <button className=' border border-gray-300 p-2  text-white ml-2' onClick={()=>deletedata(val._id)}>delete</button>
            </tr>
          ))}
  </tbody>
</table>
    </div>
  )
}

export default Tabaldata
