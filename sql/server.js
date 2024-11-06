const express = require("express")
const app = express();
const PORT = 3000;
require('./moduleConnection/db')
app.get("/",(req,res)=>{
    res.send("api working")
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
})