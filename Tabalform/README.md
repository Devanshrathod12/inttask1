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







    /////////////////////////////////////
    const User = require("../database/database");
const bcrypt = require('bcrypt');

// insert data in database
const userdata = async (req, res) => {
    const { name, email, phone, password, address, conformaddress, role } = req.body; // 'role' को भी जोड़ें

    try {
        // Check if a user with the provided email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User with this email already exists.'
            });
        }
        if (address !== conformaddress) {
            return res.status(400).json({
                success: false,
                message: 'Address and confirm address do not match.'
            });
        }
        if (phone.toString().length < 10) { // Phone number validation
            return res.status(400).json({
                success: false,
                message: 'Phone number must be longer than 10 characters.'
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user if no existing user is found
        const newUser = new User({
            name,
            email,
            phone,
            password: hashedPassword,
            address,
            conformaddress,
            role: role || 'User' // Default role set to 'User' if not provided
        });

        const users = await newUser.save();
        res.status(201).json(users); // Respond with the created user
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Error creating user.'
        });
    }
};

// get all data in the database
const alldbdata = async (req, res) => {
    try {
        const finddata = await User.find({});
        res.send(finddata);
    } catch (error) {
        res.send(error);
    }
};

// delete data in database
const deletedata = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Allow only Admin to delete users
        if (req.user.role === 'Admin') {
            const deletedUser = await User.findByIdAndDelete(userId);
            res.send(deletedUser);
        } else {
            return res.status(403).send({ message: 'Access denied.' });
        }
    } catch (error) {
        res.send(error);
    }
};

// update data on previous data
const updatedata = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        // Check if user exists
        if (!user) {
            return res.status(404).send({ message: 'User not found.' });
        }

        // Allow only Admin to update user data
        if (req.user.role === 'Admin') {
            const update = await User.findOneAndUpdate({ _id: id }, req.body, { new: true });
            res.send(update);
        } else {
            return res.status(403).send({ message: 'Access denied.' });
        }
    } catch (error) {
        res.send(error);
    }
};

module.exports = { userdata, alldbdata, deletedata, updatedata };
// chng h 