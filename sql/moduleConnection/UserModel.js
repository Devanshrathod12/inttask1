module.exports = (sequelize, DataTypes) => {
  const UserModel = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      defaultValue: 'google@gmail.com',
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    createdAt: 'create_at',
    updatedAt: 'modified_at'
  });

  return UserModel;
};
