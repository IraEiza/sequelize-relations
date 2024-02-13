const router = require('express').Router()

const {
  getAllContactInfos,
  getOneContactInfo,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo
} = require("../controllers/contactInfo.controller");

router.get("/", getAllContactInfos);
router.get("/:id", getOneContactInfo);
router.post("/", createContactInfo);
router.put("/:id", updateContactInfo);
router.delete("/:id", deleteContactInfo);

module.exports = router