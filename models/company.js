'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    } 
  }, {});
  Company.associate = function(models) {
    Company.hasMany(models.Employee, {
      as: 'employees',
    })
  };
  return Company;
};