// const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");


// create a database connection in your application using a Sequelize instance and the config file
const connection = new Sequelize('imprimante', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql' 
});

//verify your connection here !
async function connectionTest (){     
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  }
  connectionTest()
  const db={}

  db.Impression = require('./impressions.model.js')(connection,DataTypes) 

//  connection.sync({force:true}) 


module.exports = db;
