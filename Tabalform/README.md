# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



```
// import React from 'react'
// import axios from 'axios'
// import { useState , useEffect } from 'react'
// const Tabaldata = () => {


//   const [getdata, setgetdata] = useState([])


//   useEffect(() => {
//     const  fecthData = async () => {
//        try {
//          const response = await axios.get("http://localhost:3000/api/allusersdata/alldata")
//          setgetdata(response.data)
//        } catch (error) {
//          res.send(error)
//        }
//     }
//     fecthData()
//   }, [])

//   const deletedata = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/api/allusersdata/delete/${id}`);
//       setgetdata(getdata.filter(user => user._id !== id));
//     } catch (error) {
//       console.error("Error deleting user:", error);
//     }
//   };
  

//   return (
//     <div>
//      <table className="mt-4 bg-blue-100 ml-[8rem] w-4/5 border border-collapse border-gray-300">
//   <thead>
//     <tr>
//       <th className="border border-gray-300 font-bold p-2">Name</th>
//       <th className="border border-gray-300 font-bold p-2">Email</th>
//       <th className="border border-gray-300 font-bold p-2">phone</th>
//       <th className="border border-gray-300 font-bold p-2">address</th>
//       <th className="border border-gray-300 font-bold p-2">conform address</th>
//       <th className="border border-gray-300 font-bold p-2">action</th>
//     </tr>
//   </thead>
//   <tbody>
//   { getdata.map((userdata) => (
//             <tr key={userdata._id}>
//               <td className="border border-gray-300 p-2">{userdata.name}</td>
//               <td className="border border-gray-300 p-2">{userdata.email}</td>
//               <td className="border border-gray-300 p-2">{userdata.phone}</td>
//               <td className="border border-gray-300 p-2">{userdata.address}</td>
//               <td className="border border-gray-300 p-2">{userdata.conformaddress}</td>
//               <td>
//               <button className='p-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none' onClick={()=>deletedata(userdata._id)}>delete</button>
//               </td>
//               <td>
//               <button className='p-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none' onClick={()=>deletedata(userdata._id)}>delete</button>
//               </td>
//             </tr>
//           ))}
//   </tbody>
// </table>
//     </div>
//   )
// }

// export default Tabaldata
```


...<div className="flex justify-center space-x-4 mt-[8rem]"> 
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


      ///////////////////////

          <BrowserRouter>
    <Routes>
      <Route path="/"  element={<FormComponent postdata={postdata}/>}/>
      <Route path="/data"  element={<Tabledata getdata={getdata}
            deletedata={deletedata}
            updatedata={updatedata}/>}/>
    </Routes>
    </BrowserRouter>
    </div>