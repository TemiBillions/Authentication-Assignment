const express = require("express");
const auth = require("../config/auth");
const {
  createEntry,
  getEntries,
  getEntryById,
  updateEntry,
  deleteEntry
} = require("../controllers/post.controllers");

const router = express.Router();

router.use(auth);

router.post("/", createEntry);
router.get("/get-entry", getEntries);
router.get("/get-entry/:id", getEntryById);
router.put("/update-entry/:id", updateEntry);
router.delete("/delete-entry/:id", deleteEntry);

module.exports = router;
