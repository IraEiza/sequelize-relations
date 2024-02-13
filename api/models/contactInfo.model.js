const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db/index')

const ContactInfo = sequelize.define('contactInfo', {
  email: {
    type: DataTypes.STRING
  },
  phoneNumber: {
		type: DataTypes.STRING
	}
})

module.exports = ContactInfo