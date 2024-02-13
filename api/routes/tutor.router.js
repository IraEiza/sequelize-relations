const router = require('express').Router()

const {
  getAllTutors,
  getOneTutor,
  createTutor,
  updateTutor,
  deleteTutor
} = require("../controllers/tutor.controller");

router.get("/", getAllTutors);
router.get("/:id", getOneTutor);
router.post("/", createTutor);
router.put("/:id", updateTutor);
router.delete("/:id", deleteTutor);

module.exports = router