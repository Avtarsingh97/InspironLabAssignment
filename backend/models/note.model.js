const {Schema,model} = require('mongoose');

const noteSchema = new Schema({
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

const NoteModel = model('Note', noteSchema);
module.exports = NoteModel;