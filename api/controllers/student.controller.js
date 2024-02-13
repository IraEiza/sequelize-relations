const Student = require('../models/student.model')
const ContactInfo = require('../models/contactInfo.model')
const Tutor = require('../models/tutor.model')
const Subject = require('../models/subject.model')

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll()
    if(students) {
      return res.status(200).json(students)
    } else {
      return res.status(404).send('No students found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getOneStudent = async (req, res) => {
  try {
    console.log(req.params)
    const students = await Student.findByPk(req.params.id)
    if(students) {
      return res.status(200).json(students)
    } else {
      return res.status(404).send('Student not found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const createStudent = async (req, res) => {
  try {
    const newStudent = await Student.create({
      name: req.body.name,
      fav_pokemon: req.body.fav_pokemon
    })
    return res.status(200).json(newStudent)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const updateStudent = async (req, res) => {
  try {
    const updatedRows = await Student.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if(updatedRows > 0) {
      const updatedStudent = await Student.findByPk(req.params.id)
      return res.status(200).json(updatedStudent)
    } else {
      return res.status(404).send('Student not found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.destroy({
      where: {
        id: req.params.id
      }
    })
    if (student > 0) {
			return res.status(200).json('Student deleted')
		} else {
			return res.status(404).send('Student not found')
		}
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getAllStudentInfoEaster = async (req, res) => {
  try {
    const student = await Student.findByPk(
      req.params.id,
      {include: [
        ContactInfo, 
        Tutor,
        {
          model: Student,
          as: 'friend'
        }
      ]}
    )
    return res.status(200).json(student)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getAllStudentInfoLazy = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id)
    const contactInfo = await student.getContactInfo()
    return res.status(200).json({student: student, contactInfo: contactInfo})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getStudentsSubjectsEaster = async (req, res) => {
  try {
    const student = await Student.findByPk(
      req.params.id,
      {include: Subject}
    )
    return res.status(200).json(student)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getStudentsSubjectsLazy = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id)
    const subjects = await student.getSubjects()
    return res.status(200).json({student: student, subjects: subjects})
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const assignSubjectToStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId)
    const subject = await Subject.findByPk(req.params.subjectId)
    console.log(student, subject)
    const isAlreadyIn = await student.hasSubject(subject)
    if( isAlreadyIn === false) {
      await student.addSubject(
        subject, 
        { through: {year: '2024'}}
      )
      return res.status(200).json({student: student, subject: subject})
    } else {
      return res.status(200).send('Already in!!')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const removeSubjectToStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.studentId)
    const subject = await Subject.findByPk(req.params.subjectId)
    const result = await student.removeSubject(subject)
    return res.status(200).json(result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

module.exports = {
  getAllStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllStudentInfoEaster,
  getAllStudentInfoLazy,
  getStudentsSubjectsEaster,
  getStudentsSubjectsLazy,
  assignSubjectToStudent,
  removeSubjectToStudent 
}