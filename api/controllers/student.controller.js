const Student = require('../models/student.model')

const getAllStudents = async (req, res) => {
	try {
		const students = await Student.findAll({paranoid: false})
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
			firstName: req.body.firstName,
		})
		return res.status(200).json({ message: 'Student created', student: student })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateStudent = async (req, res) => {
	try {
		const [studentExist, student] = await Student.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (studentExist !== 0) {
			return res.status(200).json({ message: 'Student updated', student: student })
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


module.exports = {
  getAllStudents,
  getOneStudent,
  createStudent,
  updateStudent,
  deleteStudent
}