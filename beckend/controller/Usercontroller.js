const User = require("../database/database")

// insert data in database
const userdata = async (req, res) => {
    const {name, email,phone,address,conformaddress} = req.body;
    try {
        const newUser = new User({
            name: name,
            email: email,
            phone:phone,
            address:address,
            conformaddress:conformaddress
        })
        const users = await newUser.save();
        res.send(users)
    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error'
        })
    }
}

// get all data in the data base
const alldbdata = async(req,res)=>{
    try {
        const finddata = await User.find({})
        // console.log(finddata);
        res.send(finddata)
        
    } catch (error) {
        res.send(error)
    }
}

//delete data in database
const deletedata = async (req,res)=>{
    try {
        const deletedata = await User.findByIdAndDelete(req.params.id)
        res.send(deletedata)
    }catch (error) {
        res.send(error)
    }
}

// update data on revious data

const updatedata = async (req,res)=>{ //findByIdAndUpdate
   try {
     const id = req.params.id;
     const update = await User.findOneAndUpdate({_id:id},req.body,{new:true})
     res.send(update)
   } catch (error) {
      res.send(error)
   }
}

module.exports = {userdata,alldbdata,deletedata,updatedata}