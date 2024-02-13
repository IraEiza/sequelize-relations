const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/index')

const Subject = sequelize.define('subject', {
  name: {
    type: DataTypes.STRING
  }
})

module.exports = Subject