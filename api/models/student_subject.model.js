const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/index')

const Student_Subject = sequelize.define('student_subject', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  year: {
    type: DataTypes.STRING
  }
})

module.exports = Student_Subject