require('dotenv').config()
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});


async function checkDB() {
  try {
    await sequelize.authenticate()
    console.log('Connection succesful')
  } catch (error) {
    console.log(error)
  }
}

async function syncModels () {
  try {
    await sequelize.sync()
    console.log('Models Synchronized!')
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sequelize,
  checkDB,
  syncModels
}