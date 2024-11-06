module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('User', {  // 'User' should be a string
      name: {
        type: DataTypes.STRING,
        
      },
      email: {
        type: DataTypes.STRING,
        defaultValue:'google@gmail.com'
       
      },
      gender: {
        type: DataTypes.STRING,
    
      },
    });
  
    return UserModel;
  };
  