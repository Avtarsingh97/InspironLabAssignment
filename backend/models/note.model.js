const {Schema,model} = require('mongoose');

// Define the schema for a Note document
const noteSchema = new Schema({

    // Reference to the User who created the note
    user: {
        type : Schema.Types.ObjectId,
        ref : "user",
        required : true
    },
    title : {
        type : Schema.Types.String,
        required : true,
        trim : true
    }, 
    content : {
        type : Schema.Types.String,

    },
    category : {
        type: Schema.Types.String,

    }
},
{
    timestamps : true
})

// Create the Note model using the defined schema
const NoteModel = model('Note', noteSchema);


module.exports = NoteModel;