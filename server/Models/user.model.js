module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      UserCode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Profile: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      Fonction: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      Departement: {
        type: DataTypes.STRING,        
      },
      phonenumber: {
        type: DataTypes.INTEGER,    
      },
      NeDepassePas: {
        type: DataTypes.INTEGER,        
      },
      Mail: {
        type: DataTypes.STRING,        
      },
   
      PageImprimer: {
        type: DataTypes.INTEGER,        
      },
    },
    {
        tableName: 'Users',
        timestamps: false
      });

  
    return Users;
  };
  