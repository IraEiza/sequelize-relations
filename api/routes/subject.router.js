const router = require('express').Router()

const {
  getAllSubjects,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject
} = require("../controllers/subject.controller");

router.get("/", getAllSubjects);
router.get("/:id", getOneSubject);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.delete("/:id", deleteSubject);

module.exports = router