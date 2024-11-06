const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("temp1db", "root", "Devansh@#$%&", {
  host: 'localhost',
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 }
});

sequelize.authenticate()
  .then(() => {
    console.log("db connected successfully");
  })
  .catch(err => {
    console.log("error: " + err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.UserModel = require('./UserModel')(sequelize, DataTypes); // Pass DataTypes correctly

module.exports = db;
