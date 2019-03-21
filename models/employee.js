'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    last_name: {
      type: DataTypes.STRING
    },
    designation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    getterMethods: {
      full_name() {
        return this.name + ' ' + this.last_name;
      }
    }
  });
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Company, {
      foreingKey: 'companyId',
      onDelete: 'CASCADE',
      as: 'company'
    })
  };
  return Employee;
};