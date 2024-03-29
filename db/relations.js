const Student = require('../api/models/student.model.js')
const Tutor = require('../api/models/tutor.model.js')
const Subject = require('../api/models/subject.model.js')
const ContactInfo = require('../api/models/contactInfo.model.js')
const Student_Subject = require('../api/models/student_subject.model.js')

function addRelationsToModels() {
  try {

    // ONE TO ONE - Students & ConstactInfo
    Student.hasOne(ContactInfo, {
      foreignKey: {
        name:  'student_id',
        allowNull: false
      },
      onDelete: 'CASCADE'
    })
    ContactInfo.belongsTo(Student, {
      foreignKey: {
        name:  'student_id',
        allowNull: false
      },
      onDelete: 'CASCADE'
    })

    // ONE TO MANY - Students & Tutors
    Tutor.hasMany(Student, {
      onDelete: 'SET NULL'
    })
    Student.belongsTo(Tutor)

    // MANY TO MANY
    Student.belongsToMany(Subject, { 
      through: Student_Subject, 
      onDelete: 'CASCADE'
    })
    Subject.belongsToMany(Student, { 
      through: Student_Subject, 
      onDelete: 'CASCADE'
    })  

    // SELF RELATION - MANY TO MANY
    Student.belongsToMany(Student, { through: 'friends', as: 'friend' })

    console.log('Relations added to Models')
  } catch (error) {
    throw new Error('Error adding relations to models', error)
  }
}

module.exports = addRelationsToModels