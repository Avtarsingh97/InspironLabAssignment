const NoteModel = require("../models/note.model");

// Create Note
const createNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, content, category } = req.body;

    const newNote = await NoteModel.create({
      user: userId,
      title,
      content,
      category,
    });

    const note = await NoteModel.findOne({
        _id : newNote._id,
        user : userId
    },{new : true}).select('title content category createdAt updatedAt');

    res.status(200).json({
      success: true,
      message: "Note created successfully!",
      note,
    });
  } catch (error) {
    console.log("Error while creating Note : ", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong! Unable to create note.",
    });
  }
};

//Update note
const updateNote = async (req, res) => {
  try {
    const userId = req.user._id;
    const noteId = req.params.noteId;
  
    const { title, content, category } = req.body;
  
    const updatedNote = await NoteModel.findOneAndUpdate(
      {
        _id: noteId,
        user: userId,
      },
      {
        title,
        content,
        category,
      },
      {
        new: true,
      }
    ).select('title content category createdAt updatedAt');
  
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found!",
      });
    }
  
    res.status(200).json({
      success : true,
      message : "Note updated successfully!!",
      note : updatedNote
    });
  } catch (error) {
    console.log('Error updating note : ',error);
    return res.status(500).json({
        success : false,
        message : "Something went wrong! Unable to update note"
    })
  }
};

//Delete note
const deleteNote = async(req,res)=>{
    try {
        const userId = req.user.id;
        const noteId = req.params.noteId;

        const note = await NoteModel.findByIdAndDelete({
            user:userId,
            _id : noteId
        });

        if(!note) return res.status(404).json({message:'Note not found!'});
      
        res.status(200).json({
          success : true,
          message : "Note deleted successfully!!",
        });
      } catch (error) {
        console.log('Error updating note : ',error);
        return res.status(500).json({
            success : false,
            message : "Something went wrong! Unable to delete note"
        })
      }
}

//Get all notes by userId
const getAllNotesByUser = async(req,res)=>{
    try {
        const userId = req.user.id;
    
        const notes = await NoteModel.find({user:userId});
    
        if (notes.length === 0) {
            return res.status(200).json({
              success: true,
              message: 'No notes found!',
              notes: [],
            });
          }
    
        res.status(200).json({
            success : true,
            message : "Notes fetch successful!",
            notes
        })
    } catch (error) {
        console.log("Error fetching notes : ", error);
        res.status(500).json({
            success : true,
            message : "Something went wrong while fetching the notes."
        })
    }
}


module.exports = {
    createNote,
    updateNote,
    deleteNote,
    getAllNotesByUser
}