const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/index')

const Student = sequelize.define('student', {
  name: {
    type: DataTypes.STRING
  },
  fav_pokemon: {
		type: DataTypes.STRING
	}
})

module.exports = Student