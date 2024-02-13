const Subject = require('../models/subject.model')

const getAllSubjects = async (req, res) => {
	try {
		const subjects = await Subject.findAll( )
		if (subjects) {
			return res.status(200).json(subjects)
		} else {
			return res.status(404).send('No subjects found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getOneSubject = async (req, res) => {
	try {
		const subject = await Subject.findByPk(req.params.id)
		if (subject) {
			return res.status(200).json(subject)
		} else {
			return res.status(404).send('Subject not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createSubject = async (req, res) => {
	try {
		const subject = await Subject.create({
			firstName: req.body.firstName,
		})
		return res.status(200).json({ message: 'Subject created', subject: subject })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateSubject = async (req, res) => {
	try {
		const [subjectExist, subject] = await Subject.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (subjectExist !== 0) {
			return res.status(200).json({ message: 'Subject updated', subject: subject })
		} else {
			return res.status(404).send('Subject not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteSubject = async (req, res) => {
	try {
		const subject = await Subject.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (subject) {
			return res.status(200).json('Subject deleted')
		} else {
			return res.status(404).send('Subject not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}


module.exports = {
  getAllSubjects,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject
}