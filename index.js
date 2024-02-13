const { checkDB, syncModels } = require('./db/index.js')
const express = require('express')
const morgan = require("morgan");
const addRelationsToModels = require('./db/relations.js')

const Student = require('../api/models/student.model.js')
const Tutor = require('../api/models/tutor.model.js')
const Subject = require('../api/models/subject.model.js')
const ContactInfo = require('../api/models/contactInfo.model.js')

const router = require('./api/routes/index.js')

async function dbConnect() {
  try {
    await checkDB()
    addRelationsToModels()
    await syncModels()
  } catch (error) {
    console.log(error)
  }
}

const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("dev"));

app.listen(port, async () => {
  await dbConnect()
  console.log(`--> Servidor arrancado en puerto ${port}`)
})

app.use('/api', router)
