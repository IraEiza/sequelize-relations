const Tutor = require('../models/tutor.model')

const getAllTutors = async (req, res) => {
	try {
		const tutors = await Tutor.findAll( )
		if (tutors) {
			return res.status(200).json(tutors)
		} else {
			return res.status(404).send('No tutors found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getOneTutor = async (req, res) => {
	try {
		const tutor = await Tutor.findByPk(req.params.id)
		if (tutor) {
			return res.status(200).json(tutor)
		} else {
			return res.status(404).send('Tutor not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createTutor = async (req, res) => {
	try {
		const tutor = await Tutor.create({
			firstName: req.body.firstName,
		})
		return res.status(200).json({ message: 'Tutor created', tutor: tutor })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateTutor = async (req, res) => {
	try {
		const [tutorExist, tutor] = await Tutor.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (tutorExist !== 0) {
			return res.status(200).json({ message: 'Tutor updated', tutor: tutor })
		} else {
			return res.status(404).send('Tutor not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteTutor = async (req, res) => {
	try {
		const tutor = await Tutor.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (tutor) {
			return res.status(200).json('Tutor deleted')
		} else {
			return res.status(404).send('Tutor not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}


module.exports = {
  getAllTutors,
  getOneTutor,
  createTutor,
  updateTutor,
  deleteTutor
}