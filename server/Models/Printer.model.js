const { Sequelize, DataTypes } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
    const Printer = sequelize.define('Printer', {
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