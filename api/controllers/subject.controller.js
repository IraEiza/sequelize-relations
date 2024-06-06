const Subject = require('../models/subject.model');

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.findAll();
    if (subjects) {
      return res.status(200).json(subjects);
    } else {
      return res.status(404).send('No subjects found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getOneSubject = async (req, res) => {
  try {
    const subject = await Subject.findByPk(req.params.id);
    if (subject) {
      return res.status(200).json(subject);
    } else {
      return res.status(404).send('Subject not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const createSubject = async (req, res) => {
  try {
    const newSubject = await Subject.create({
      name: req.body.name,
      code: req.body.code
    });
    return res.status(200).json(newSubject);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateSubject = async (req, res) => {
  try {
    const updatedRows = await Subject.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (updatedRows > 0) {
      const updatedSubject = await Subject.findByPk(req.params.id);
      return res.status(200).json(updatedSubject);
    } else {
      return res.status(404).send('Subject not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.destroy({
      where: {
        id: req.params.id
      }
    });
    if (subject > 0) {
      return res.status(200).json('Subject deleted');
    } else {
      return res.status(404).send('Subject not found');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllSubjects,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject
};
