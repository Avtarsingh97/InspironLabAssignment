import AxiosInstances from "./index";

//Fetches all notes from the backend
const getAllNotes = async () => {
  return await AxiosInstances.get(`/note`);
};

//Sends new note data to the backend to create a note
const createNote = async (data) => {
  return await AxiosInstances.post(`/note`, data);
};

//Deletes a specific note by its ID
const deleteNote = async (noteId) => {
  return await AxiosInstances.delete(`/note/${noteId}`);
};

//Edits an existing note by ID with updated content
const editNote = async (noteId, value) => {
  return await AxiosInstances.put(`/note/${noteId}`, value);
};

export default {
  getAllNotes,
  createNote,
  deleteNote,
  editNote,
};
