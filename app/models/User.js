'use strict';

module.exports = (sequelize, DataTypes) => {

  const user = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: {
          msg: "The name can only contain letters"
        },
        len: {
          args: [2, 255],
          msg: "The number must be at least two characters long"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "email should be unique"
        }
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 255],
          msg: "min 6 caracteres"
        }
      }
    },
  }, {
    tableName: "users"
  });

  user.associate = function(models) {
    // associations can be defined here
  };

  return user;
};