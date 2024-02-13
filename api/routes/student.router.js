const router = require('express').Router()

const {
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
} = require("../controllers/student.controller");

router.get("/", getAllStudents);
router.get("/:id", getOneStudent);
router.get("/:id/easter", getAllStudentInfoEaster)
router.get("/:id/lazy", getAllStudentInfoLazy)
router.get("/:id/subjects/easter", getStudentsSubjectsEaster),
router.get("/:id/subjects/lazy", getStudentsSubjectsLazy),
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.put("/:studentId/subject/:subjectId", assignSubjectToStudent);
router.delete("/:id", deleteStudent);
router.delete("/:studentId/subject/:subjectId", removeSubjectToStudent)



module.exports = router