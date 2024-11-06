module.exports = (sequelize, DataTypes) => {
    const UserModel = sequelize.define('User', {  // 'User' should be a string
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return UserModel;
  };
  