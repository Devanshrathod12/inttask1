const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("db", "root", "Devansh@#$%&", {
  host: 'localhost',
  logging:true,  // to show all msg in  a turminals on true 
  dialect: 'mysql',
  pool: { max: 5, min: 0, idle: 10000 }
});

// Test database connection
sequelize.authenticate()
  .then(() => {
    console.log("db connected successfully");
  })
  .catch(err => {
    console.log("error: " + err);
  });

// Define `db` object to hold Sequelize and models
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and initialize `UserModel`
db.UserModel = require('./UserModel')(sequelize, DataTypes);

// Sync database without forcing to avoid dropping tables
db.sequelize.sync({ force: false, match: /db$/ })
  .then(() => {
    console.log("YES RE-SYNC");
  })
  .catch(err => {
    console.log("Error during re-sync: " + err);
  });

module.exports = db;
