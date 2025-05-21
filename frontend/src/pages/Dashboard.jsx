import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useForm } from "react-hook-form";

import NavBar from "../components/NavBar";
import useUserStore from "../stores/user";
import notesApi from "../apiManager/note";

const Dashboard = () => {
  const { user } = useUserStore();

  //local state
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [notes, setNotes] = useState([]);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  /* ===================== Fetch notes once on mount ===================== */
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (!user?._id) {
          toast.error("User ID missing. Please sign in again.");
          return;
        }
        const { data } = await notesApi.getAllNotes();
        setNotes(data?.notes || []);
      } catch (err) {
        console.error("Error fetching notes:", err);
        toast.error("Failed to load notes. Try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user?._id]);

  /* ===================== Set Form Values When Modal Opens ===================== */
  useEffect(() => {
    if (isModalOpen) {
      if (editingNote) {
        reset({
          title: editingNote.title,
          content: editingNote.content,
          category: editingNote.category,
        });
      } else {
        reset();
      }
    }
  }, [isModalOpen, editingNote, reset]);

  /* ===================== Handlers ===================== */

  //Save edited note
  const handleEditNote = async (value) => {
    setIsLoading(true);
    const noteId = editingNote?._id;
    try {
      const response = await notesApi.editNote(noteId, value);
      setNotes((prevNotes) => prevNotes.map((note) => (note._id === noteId ? response?.data?.note : note)));
      toast.success("Note updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error updating note : ", error);
      toast.error("Failed to update note! Try Again..");
    } finally {
      setEditingNote(null);
      setIsLoading(false);
    }
  };

  // Open edit modal with selected note
  const handleEdit = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  // Delete a Note
  const handleDelete = async (noteId) => {
    try {
      await notesApi.deleteNote(noteId);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.error("Error deleting note. Try again.");
    }
  };

  // Open Modal for adding new note
  const handleAddNote = () => {
    reset();
    setIsModalOpen(true);
  }; 

  // Submit form for adding note
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await notesApi.createNote(data);
      const newNote = response.data.note;
      setNotes((prev) => [...prev, newNote]);
      toast.success("Note added successfully!");
      reset();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error while adding note:", error);
      toast.error("Error adding note! Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ===================== UI ===================== */
  return (
    <>
    {/* Navigation Bar */}
      <NavBar />

      {/* Main Container */}
      <div className='min-h-screen bg-gradient-to-br from-slate-900 to-black text-white px-4 py-10'>
        <div className='max-w-6xl mx-auto'>
          <h2 className='text-3xl font-bold mb-6 text-center'>Your Notes</h2>

          {/* Notes Grid */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

            {/* Map on every note */}
            {notes.map((note) => (
              <div
                key={note._id}
                className='bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02]'
              >
                <h3 className='text-xl font-semibold mb-2'>{note.title}</h3>
                <p className='text-gray-300 text-sm whitespace-pre-line mb-6'>{note.content}</p>

                <div className='flex gap-3'>

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(note)}
                    className='bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition'
                    title='Edit Note'
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(note._id)}
                    className='bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition'
                    title='Delete Note'
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Message to display when no notes */}
          {notes.length === 0 && !isLoading && (
            <p className='text-center text-gray-400 mt-20 text-lg'>You have no notes yet. Start by creating one!</p>
          )}
        </div>

        {/* Floating “Add Note” button */}
        <button
          onClick={handleAddNote}
          className='fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-3xl'
          title='Add Note'
        >
          +
        </button>

        {/* Add/Edit Note Modal */}
        <Modal
          title={editingNote ? "Edit Note" : "Add Note"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <form
            onSubmit={editingNote ? handleSubmit(handleEditNote) : handleSubmit(onSubmit)}
            className='space-y-4'
          >
            {/* Title Input */}
            <input
              type='text'
              placeholder='Enter title here...'
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && <p className='mt-1 text-sm text-red-500'>{errors.title.message}</p>}

            {/* Content Input */}
            <textarea
              placeholder='Enter content here..'
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              rows={5}
              {...register("content")}
            />

            {/* Category Input */}
            <input
              type='text'
              placeholder='Enter category here..'
              className='w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500'
              {...register("category")}
            />

            {/* Save Button */}
            <button
              type='submit'
              className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-300'
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Dashboard;
