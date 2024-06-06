const Tutor = require('../models/tutor.model');

const getAllTutors = async (req, res) => {
  try {
    const tutors = await Tutor.findAll();
    if (tutors) {
      return res.status(200).json(tutors);
    } else {
      return res.status(404).send('No tutors found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneTutor = async (req, res) => {
  try {
    const tutor = await Tutor.findByPk(req.params.id);
    if (tutor) {
      return res.status(200).json(tutor);
    } else {
      return res.status(404).send('Tutor not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createTutor = async (req, res) => {
  try {
    const newTutor = await Tutor.create({
      name: req.body.name,
      expertise: req.body.expertise
    });
    return res.status(200).json(newTutor);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateTutor = async (req, res) => {
  try {
    const updatedRows = await Tutor.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (updatedRows > 0) {
      const updatedTutor = await Tutor.findByPk(req.params.id);
      return res.status(200).json(updatedTutor);
    } else {
      return res.status(404).send('Tutor not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTutor = async (req, res) => {
  try {
    const tutor = await Tutor.destroy({
      where: {
        id: req.params.id
      }
    });
    if (tutor > 0) {
      return res.status(200).json('Tutor deleted');
    } else {
      return res.status(404).send('Tutor not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllTutors,
  getOneTutor,
  createTutor,
  updateTutor,
  deleteTutor
};
