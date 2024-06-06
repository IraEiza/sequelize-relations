const ContactInfo = require('../models/contactInfo.model');

const getAllContactInfos = async (req, res) => {
  try {
    const contactInfos = await ContactInfo.findAll();
    if (contactInfos) {
      return res.status(200).json(contactInfos);
    } else {
      return res.status(404).send('No contact information found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findByPk(req.params.id);
    if (contactInfo) {
      return res.status(200).json(contactInfo);
    } else {
      return res.status(404).send('Contact information not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createContactInfo = async (req, res) => {
  try {
    const newContactInfo = await ContactInfo.create({
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address
    });
    return res.status(200).json(newContactInfo);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateContactInfo = async (req, res) => {
  try {
    const updatedRows = await ContactInfo.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (updatedRows > 0) {
      const updatedContactInfo = await ContactInfo.findByPk(req.params.id);
      return res.status(200).json(updatedContactInfo);
    } else {
      return res.status(404).send('Contact information not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.destroy({
      where: {
        id: req.params.id
      }
    });
    if (contactInfo > 0) {
      return res.status(200).json('Contact information deleted');
    } else {
      return res.status(404).send('Contact information not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllContactInfos,
  getOneContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo
};
