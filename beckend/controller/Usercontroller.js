const User = require("../database/database")

// insert data in database
const userdata = async (req, res) => {
    const { name, email, phone, address, conformaddress } = req.body;

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
                message: 'Address and confirm address not match.'
            });
        }
        if (phone.length <= 9) {
            return res.status(400).json({
                success: false,
                message: 'Phone number must be longer than 10 characters.'
            });
        }
        // Create a new user if no existing user is found
        const newUser = new User({
            name,
            email,
            phone,
            address,
            conformaddress
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