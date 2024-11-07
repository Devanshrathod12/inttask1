const express = require("express")
const app = express();
const PORT = 3000;
require('./moduleConnection/db')
crudopration = require("./controller/usercontroller")
var userctlr = require("./controller/usercontroller")
app.get("/",(req,res)=>{
    res.send("api working")
})

app.get("/add", userctlr.adduser)
app.get("/curd", userctlr.crudopration)//inser
app.get("/update", userctlr.crudopration2)//update
app.get("/delete", userctlr.crudopration3)//delete
app.get("/tunk", userctlr.crudopration4)//select truncakt
app.get("/bulk", userctlr.crudopration5)//bulk inser



app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`); 
})