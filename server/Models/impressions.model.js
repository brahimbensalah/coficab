const { Sequelize, DataTypes } = require('sequelize');



module.exports = (sequelize, DataTypes) => {
    const Impression = sequelize.define('Impression', {
      UID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
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
      indexes: [
        {
          unique: true,
          name: "unique_print_entry",
          fields: ["UID", "NameImp", "User", "Page", "Date", "Time"]
        }
      ] 
    }
   );

  
    return Impression;
  };
  