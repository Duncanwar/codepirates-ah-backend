'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stats = sequelize.define('Stats', {
    description: DataTypes.STRING,
    item: DataTypes.STRING,
    readerId: DataTypes.INTEGER
  }, {});
  Stats.associate = function (models) {
    // associations can be defined here
  }
  return Stats;
};