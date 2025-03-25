// const config = require("./config.js");
const { Sequelize, DataTypes } = require("sequelize");
const { FOREIGNKEYS } = require("sequelize/lib/query-types");


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

  db.Printer = require('./Printer.model.js')(connection,DataTypes) 
  db.Impression = require('./impressions.model.js')(connection,DataTypes) 

  db.Printer.hasMany(db.Impression
  //   ,{
  //   foreignKey:"printerId"
  // }
)
  db.Impression.belongsTo(db.Printer)

//  connection.sync({force:true}) 
//  db.Impression.sync({force:true}) 


module.exports = db;
