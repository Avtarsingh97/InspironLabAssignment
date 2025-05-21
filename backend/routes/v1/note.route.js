const express = require('express');
const authMiddleware = require('../../middleware/auth.middleware');
const noteController = require('../../controller/note.controller');

const router = express.Router();


//Create a new note for the authenticated user
router.post('/',authMiddleware.protect,noteController.createNote);

//Update a note by ID for the authenticated user
router.put('/:noteId',authMiddleware.protect, noteController.updateNote);

//Delete a note by ID for the authenticated user
router.delete('/:noteId',authMiddleware.protect, noteController.deleteNote);

//Get all notes created by the authenticated user
router.get('/',authMiddleware.protect, noteController.getAllNotesByUser);

module.exports = router;