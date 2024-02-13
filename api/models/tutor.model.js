const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/index')

const Tutor = sequelize.define('tutor', {
  name: {
    type: DataTypes.STRING
  },
  fav_color: {
		type: DataTypes.STRING
	}
})

module.exports = Tutor