const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./database/database");
const multer = require("multer")
const upload = multer({ dest: "uploads/"})
const product_routes = require("./routes/Routes")
app.use(express.json());
app.use(cors());

// Home page routes
app.get("/",(req,res)=>{
    res.send("api working")
})

// api end points
app.use("/api/allusersdata",product_routes)


// post route the data in the database
// app.post("/post",async(req,res)=>{
//     try {
//         const userdata = new User(req.body)
//         const savedata = await userdata.save()
//         res.send(savedata)
//     } catch (error) {
//         res.send(error)
//     }
// })

//delete data
// app.delete("/delete/:id",async(req,res)=>{
//     try {
//         const deletedata = await User.findByIdAndDelete(req.params.id)
//         res.send(deletedata)
//     }catch (error) {
//         res.send(error)
//     }
// })

// app.get("/get",async(req,res)=>{
//      try {
//         const finddata = await User.find({})
//         console.log(finddata);
//         res.send(finddata)
        
//      } catch (error) {
//         res.send(error)
//      }
// })


app.listen(3000,()=>{
    console.log("server running on port 3000")
})