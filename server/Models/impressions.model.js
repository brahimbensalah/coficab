const { Sequelize, DataTypes } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
    const Impression = sequelize.define('Impression', {
      NameImp: {
        type: DataTypes.STRING,
        allowNull: false,
      },  
      User: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Page  : {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Result: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Date: { 
        type: DataTypes.DATEONLY, // 📌 Stocke uniquement la date (AAAA-MM-JJ)
        allowNull: false,
      },
      Time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
     
    }, 
    {
      tableName: 'Impression',
      timestamps: false
    });
  
    return Impression;
  };
  