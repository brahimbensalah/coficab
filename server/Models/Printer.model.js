const { Sequelize, DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    const Printer = sequelize.define('Printer', {
      printerId:{
        type: DataTypes.STRING,
        allowNull: false,
        uniqueOne: { type: DataTypes.STRING, unique: 'compositeIndex' },
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ip_adress: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
    },
    {
        tableName: 'Printer',
        timestamps: false
      });
    
      return Printer;
    };