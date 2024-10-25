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

app.listen(3000,()=>{
    console.log("server running on port 3000")
})