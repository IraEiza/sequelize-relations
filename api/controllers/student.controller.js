const Student = require('../models/student.model')
const ContactInfo = require('../models/contactInfo.model')
const Tutor = require('../models/tutor.model')
const Subject = require('../models/subject.model')

const getAllStudents = async (req, res) => {
	try {
		const students = await Student.findAll( )
		if (students) {
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
		const student = await Student.findByPk(req.params.id)
		if (student) {
			return res.status(200).json(student)
		} else {
			return res.status(404).send('Student not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createStudent = async (req, res) => {
	try {
		const student = await Student.create({
			name: req.body.name,
			fav_pokemon: req.body.fav_pokemon,
		})
		return res.status(200).json({ message: 'Student created', student: student })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateStudent = async (req, res) => {
	try {
		const studentExists = await Student.update(req.body, {
			where: {
				id: req.params.id,
			}
		})
      if (studentExists !== 0) {
			const updatedStudent = await Student.findByPk(req.params.id);
			return res.status(200).json({ message: 'Student updated', student: updatedStudent })
		} else {
			return res.status(404).send('Student not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteStudent = async (req, res) => {
	try {
		const student = await Student.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (student) {
			return res.status(200).json('Student deleted')
		} else {
			return res.status(404).send('Student not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const getOneStudentInfoEaster = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.id, { include: [
			{
				model: Student,
				as: 'friend'
			}, 
			Tutor,
			ContactInfo
		] }
		)
		if (student) {
			return res.status(200).json(student)
		} else {
			return res.status(404).send('Student not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getOneStudentInfoLazy = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.id)
		const contactInfo = await student.getContactInfo()

		return res.status(200).json({student, contactInfo})
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createCompleteStudentLazy = async (req, res) => {
	try {
		const student = await Student.create({
			name: req.body.name,
			fav_pokemon: req.body.fav_pokemon,
		})
		const contactInfo = await student.setContactInfo({
			email: req.body.email,
			phoneNumber: req.body.phoneNumber
		})
		return res.status(200).json({ message: 'Student created', student: student, contactInfo: contactInfo })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getStudentsSubjectsEaster = async (req, res) => {
	try {
		const studentsSubjects = await Student.findByPk(req.params.id, {include: Subject})
		return res.status(200).json(studentsSubjects)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getStudentsSubjectsLazy = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.id)
		const studentsSubjects = await student.getSubjects()
		return res.status(200).json(studentsSubjects)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const assignSubjectToStudent = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.studentId)
		const subject = await Subject.findByPk(req.params.subjectId)
		const result = await student.addSubject(subject,  {through:{year: 2024}})
		return res.status(200).json(result)
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const removeSubjectToStudent = async (req, res) => {
	try {
		const student = await Student.findByPk(req.params.studentId)
		const subject = await Subject.findByPk(req.params.subjectId)
		const result = await student.removeSubject(subject)
		return res.status(200).send('Subject removed')
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
	getOneStudentInfoEaster,
	getOneStudentInfoLazy,
	createCompleteStudentLazy,
	getStudentsSubjectsEaster,
	getStudentsSubjectsLazy,
	assignSubjectToStudent,
	removeSubjectToStudent
}