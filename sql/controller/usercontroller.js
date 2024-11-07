const { where } = require("sequelize");
const { UserModel } = require("../moduleConnection/db");

var adduser = async (req, res) => {
    try {
      let data = await UserModel.create({ name: "devanshrrr", email: "rathodrr@gmail.com", gender: "malee" });

      //update
    //    data.name = 'rathod';
    //    data.save()
    //    console.log(data.dataValues);
  
    // detete
    //   data.destroy()
      let response = { data: 'ok' };
      
      res.status(200).json(response); // Ensure response is sent
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  //indert db
  const crudopration = async (req,res) => {
   const data = await UserModel.create({ name: "baba", email: "baba@gmail.com", gender: "sigmale" });
   console.log(data.dataValues);
      res.status(200).json({
        massage:"user Added",
        user:data
      });
  }
  ///update
  const crudopration2 = async (req, res) => {
    try {
      const [affectedRows] = await UserModel.update(
        { email: 'bhart' },
        {
          where: { id: 4 } 
        }
      );
      if (affectedRows === 0) {
        return res.status(404).json({ message: "User not found or no changes made" });
      }
      const updatedUser = await UserModel.findOne({ where: { id: 4 } });
  
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
 
// delete 
const crudopration3 = async (req,res) => {
    let data = await UserModel.destroy({
        where:{
            id:4
        }
    })
    console.log(data.dataValues);
       res.status(200).json({
         massage:"user deleted",
         user:data
       });
   }
   //trunkkekt sleect
   const crudopration4 = async (req,res) => {
    let data = await UserModel.destroy({
        truncate:true
    })
    console.log(data.dataValues);
       res.status(200).json({
         massage:"user trunket",
         user:data
       });
   }
  // insert bulk data  
   const crudopration5 = async (req,res) => {
    // let data = await UserModel.bulkCreate([
    //     {name:"d",email:"d@gmail.com",gender:"male"},
    //     {name:"e",email:"e@gmail.com",gender:"male"},
    //     {name:"v",email:"v@gmail.com",gender:"male"},
    //     {name:"a",email:"a@gmail.com",gender:"male"},
    //     {name:"n",email:"n@gmail.com",gender:"male"},
    //     {name:"s",email:"s@gmail.com",gender:"male"},
    //     {name:"h",email:"h@gmail.com",gender:"male"},
    //     {name:"d",email:"d@gmail.com",gender:"male"},
    //     {name:"e",email:"e@gmail.com",gender:"male"},
    //     {name:"v",email:"v@gmail.com",gender:"male"},
    //     {name:"a",email:"a@gmail.com",gender:"male"},
    //     {name:"n",email:"n@gmail.com",gender:"male"},
    //     {name:"s",email:"s@gmail.com",gender:"male"},
    //     {name:"h",email:"h@gmail.com",gender:"male"},
    //     {name:"d",email:"d@gmail.com",gender:"male"},
    //     {name:"e",email:"e@gmail.com",gender:"male"},
    //     {name:"v",email:"v@gmail.com",gender:"male"},
    //     {name:"a",email:"a@gmail.com",gender:"male"},
    //     {name:"n",email:"n@gmail.com",gender:"male"},
    //     {name:"s",email:"s@gmail.com",gender:"male"},
    //     {name:"h",email:"h@gmail.com",gender:"male"},
    //     {name:"d",email:"d@gmail.com",gender:"male"},
    //     {name:"e",email:"e@gmail.com",gender:"male"},
    //     {name:"v",email:"v@gmail.com",gender:"male"},
    //     {name:"a",email:"a@gmail.com",gender:"male"},
    //     {name:"n",email:"n@gmail.com",gender:"male"},
    //     {name:"s",email:"s@gmail.com",gender:"male"},
    //     {name:"h",email:"h@gmail.com",gender:"male"}
   // ])

   // find all data find in a web db sql

   let data = await UserModel.findAll({})
   //let data = await UserModel.findOne({})
    console.log(data.dataValues);
       let responce = {
        data:data
       }
       res.status(200).json(responce)
   }


module.exports = {
  adduser,
  crudopration,
  crudopration2,
  crudopration3,
  crudopration4,
  crudopration5
};
