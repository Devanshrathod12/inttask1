const userdata = async (req, res) => {
    const {name, email,phone,password} = req.body;
    try {
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({
                success: false,
                message: 'User already exists'
            })
        }


        if (password.length < 4) {
            return res.json({
                success: false,
                message: 'please enter a strong password'
            })
        }

        const newUser = new userModel({
            name: name,
            email: email,
            phone:phone,
            password:password
        })

        const user = await newUser.save();
        res.json({
            success: true,
          
        });
    } 
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: 'Error'
        })
    }
}

const alluserdata = async(req,res)=>{
    res.status(200).json({msg:"i alluser aam msg"})
}
module.exports = {userdata,alluserdata}