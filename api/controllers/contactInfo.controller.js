const ContactInfo = require('../models/contactInfo.model')

const getAllContactInfos = async (req, res) => {
	try {
		const contactInfos = await ContactInfo.findAll({paranoid: false})
		if (contactInfos) {
			return res.status(200).json(contactInfos)
		} else {
			return res.status(404).send('No contactInfos found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const getOneContactInfo = async (req, res) => {
	try {
		const contactInfo = await ContactInfo.findByPk(req.params.id)
		if (contactInfo) {
			return res.status(200).json(contactInfo)
		} else {
			return res.status(404).send('ContactInfo not found')
		}
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const createContactInfo = async (req, res) => {
	try {
		const contactInfo = await ContactInfo.create({
			firstName: req.body.firstName,
		})
		return res.status(200).json({ message: 'ContactInfo created', contactInfo: contactInfo })
	} catch (error) {
		res.status(500).send(error.message)
	}
}

const updateContactInfo = async (req, res) => {
	try {
		const [contactInfoExist, contactInfo] = await ContactInfo.update(req.body, {
			returning: true,
			where: {
				id: req.params.id,
			},
		})
        if (contactInfoExist !== 0) {
			return res.status(200).json({ message: 'ContactInfo updated', contactInfo: contactInfo })
		} else {
			return res.status(404).send('ContactInfo not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}

const deleteContactInfo = async (req, res) => {
	try {
		const contactInfo = await ContactInfo.destroy({
			where: {
				id: req.params.id,
			},
		})
		if (contactInfo) {
			return res.status(200).json('ContactInfo deleted')
		} else {
			return res.status(404).send('ContactInfo not found')
		}
	} catch (error) {
		return res.status(500).send(error.message)
	}
}


module.exports = {
  getAllContactInfos,
  getOneContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo
}