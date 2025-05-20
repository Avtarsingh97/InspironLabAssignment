import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useUserStore from "../stores/user";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); 

  const {user} = useUserStore();

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Meeting Notes",
      content: "Discuss project milestones and assign tasks to team.",
    },
    {
      id: 2,
      title: "Shopping List",
      content: "Milk, Bread, Eggs, Coffee, Rice, Pasta",
    },
    {
      id: 3,
      title: "Ideas",
      content: "Explore AI-based features for note summarization.",
    },
  ]);

//   useEffect(()=>{
//     const fetchData = async()=>{
//         setLoading(true);
        
//         try {
//             const userId = user._id;
//             if(!userId){
//                 toast.error("User Id missing. Please try login again.")
//                 return;
//             }
//             const response = await 
//         } catch (error) {
            
//         }
//     }
//   },[])



  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-black text-white px-4 py-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Your Notes</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <div
                key={note.id}
                className="bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-[1.02] relative"
              >
                <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                <p className="text-gray-300 text-sm whitespace-pre-line mb-6">
                  {note.content}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(note.id)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {notes.length === 0 && (
            <div className="text-center text-gray-400 mt-20 text-lg">
              You have no notes yet. Start by creating one!
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
