const express = require('express');
const authMiddleware = require('../../middleware/auth.middleware');
const noteController = require('../../controller/note.controller');

const router = express.Router();

router.post('/',authMiddleware.protect,noteController.createNote);
router.put('/:noteId',authMiddleware.protect, noteController.updateNote);
router.delete('/:noteId',authMiddleware.protect, noteController.deleteNote);
router.get('/',authMiddleware.protect, noteController.getAllNotesByUser);

module.exports = router;